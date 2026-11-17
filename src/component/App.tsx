import * as React from "react";
import "./App.sass";
import Bookshelf from "./Bookshelf";
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Color4 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { Scene } from '@babylonjs/core/scene.js';
import {ScreenSizeObserverSingleton} from "../utility/screen-size-observer/ScreenSizeObserverSingleton";
import ScreenSizeObserver from "../utility/screen-size-observer/ScreenSizeObserver";
import {BoxText} from "../utility/3d/box-text/BoxText";
import {boundMethod} from 'autobind-decorator';
import {BOX_COLOR, FONT_FAMILY, FONT_TYPE} from "./App.constant";

export interface AppState
{
  page: number,
  animationRun: boolean,
  contentAnimation: string,
  loading: boolean
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _boxText: BoxText;
  private _canvasActive: boolean;
  private _animationRunning: number;
  private _screenWidth: number;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _titleCanvas = React.createRef<HTMLCanvasElement>();

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._canvasActive = true;
    this._animationRunning = 0;
    this.state =
    {
      page: 1,
      animationRun: false,
      contentAnimation: '',
      loading: false
    }
  }

  componentDidMount(): void
  {
    document.fonts.load('10pt "'+FONT_FAMILY+'"').then(() =>
    {
      this._initializeCanvas();
    });
    window.addEventListener("resize", this._onResize);
    window.addEventListener("focus", this._onWindowFocus);
    window.addEventListener("blur", this._onWindowLeave);
  }

  componentWillUnmount(): void
  {
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("focus", this._onWindowFocus);
    window.removeEventListener("blur", this._onWindowLeave);
    if (this._boxText) this._screenSizeObserver.detach(this._boxText);
    this._engine?.dispose();
  }

  render()
  {
    const { page, contentAnimation} = this.state;

    return <main id={'app'}>
      <h1 className={'meta-description'}>rizky riyaldhi</h1>
      <div
        className={`content ${window.innerWidth < 720 ? '' : 'animated'} ${contentAnimation}`}
      >
        <canvas
          aria-hidden="true"
          ref={this._titleCanvas}
          style={{visibility: page === 1 ? 'visible' : 'hidden'}}
          onMouseEnter={this._canvasMouseEnterCallback}
          onMouseLeave={this._canvasMouseLeaveCallback}
        />
      </div>
      <Bookshelf />
    </main>
  }

  @boundMethod
  private _onResize(): void
  {
    if (!this._engine) return;

    this._engine.resize();
    const width = window.innerWidth;
    if (width !== this._screenWidth)
    {
      this._animationRunning = 0;
      this._screenWidth = width;
      this._screenSizeObserver.notify(width);
      this.setState({ animationRun: false });
    }
    this._engine.runRenderLoop(this._renderCanvas);
  }

  @boundMethod
  private _initializeCanvas(): void
  {
    const canvas = this._titleCanvas.current;
    if (!canvas) return;
    this._engine = new Engine
    (
      canvas,
      false,
      null,
      true
    );
    this._engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this._scene = new Scene(this._engine);
    this._scene.clearColor = new Color4(1, 1, 1, 1);
    this._scene.blockMaterialDirtyMechanism = true;
    new FreeCamera('camera', new Vector3(0, 0, -10), this._scene);
    this._boxText = new BoxText(
      this._scene,
      'rizky riyaldhi',
      1,
      BOX_COLOR,
      FONT_FAMILY,
      FONT_TYPE,
      this._boxAnimationStartCallback,
      this._boxAnimationHalfEndCallback,
      this._boxAnimationEndCallback
    );
    this._screenWidth = window.innerWidth;
    this._boxText.initiate(this._screenWidth);
    this._screenSizeObserver.attach(this._boxText);
    this._engine.runRenderLoop(this._renderCanvas);
  }

  @boundMethod
  private _renderCanvas(): void
  {
    if (this && this._scene)
    {
      this._scene.render();
    }
  }

  @boundMethod
  private _boxAnimationStartCallback(): void
  {
    this._animationRunning++;
  }

  @boundMethod
  private _boxAnimationHalfEndCallback(): void
  {
    if (this._getMobile())
    {
      this.setState({
        ...this.state,
        animationRun: true,
      });
      if (this._animationRunning > 0)
        this._animationRunning--;
      if (this._animationRunning == 0)
      {
        if (!this._canvasActive)
        {
          if (this._engine)
          {
            this._engine.stopRenderLoop();
          }
        }
      }
    }
  }

  @boundMethod
  private _boxAnimationEndCallback(): void
  {
    if (!this._getMobile())
    {
      this.setState({
        ...this.state,
        animationRun: true,
      });
      if (this._animationRunning > 0)
        this._animationRunning--;
      if (this._animationRunning == 0)
      {
        if (!this._canvasActive)
        {
          if (this._engine)
          {
            this._engine.stopRenderLoop();
          }
        }
      }
    }
  }

  @boundMethod
  private _getMobile()
  {
    const width = window.innerWidth;
    return width < 720;
  }

  @boundMethod
  private _canvasMouseEnterCallback(): void
  {
    this._canvasActive = true;
    if (this._engine)
    {
      this._engine.runRenderLoop(this._renderCanvas);
    }
  }

  @boundMethod
  private _canvasMouseLeaveCallback(): void
  {
    this._canvasActive = false;
    if (this._animationRunning == 0)
    {
      if (this._engine)
      {
        this._engine.stopRenderLoop();
      }
    }
  }

  @boundMethod
  private _onWindowFocus(): void
  {
    if (this._engine)
    {
      this._engine.runRenderLoop(this._renderCanvas);
    }
  }

  @boundMethod
  private _onWindowLeave(): void
  {
    if (this._engine)
    {
      this._engine.stopRenderLoop();
    }
  }

}
