import * as React from "react";
import "./App.sass";
import {Color4, Engine, Scene} from 'babylonjs';
import {ScreenSizeObserverSingleton} from "../utility/screen-size-observer/ScreenSizeObserverSingleton";
import ScreenSizeObserver from "../utility/screen-size-observer/ScreenSizeObserver";
import {BoxText} from "../utility/3d/box-text/BoxText";
import {Vector3, FreeCamera} from "babylonjs";
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
  private _currentMobile: boolean;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _content: React.RefObject<any>;
  private readonly _titleCanvas: React.RefObject<any>;

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._content = React.createRef();
    this._titleCanvas = React.createRef();
    this._canvasActive = true;
    this._animationRunning = 0;
    this._currentMobile = this._getMobile();
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
    // @ts-ignore
    document.fonts.load('10pt "'+FONT_FAMILY+'"').then(() =>
    {
      this._initializeCanvas();
    });
    window.addEventListener("resize", this._onResize);
    window.addEventListener("focus", this._onWindowFocus);
    window.addEventListener("blur", this._onWindowLeave);
  }

  render()
  {
    const { page, contentAnimation} = this.state;

    return <div id={'app'}>
      <span className={'meta-description'}>rizky riyaldhi</span>
      <div
        ref={this._content}
        className={`content ${window.innerWidth < 720 ? '' : 'animated'} ${contentAnimation}`}
      >
        <canvas
          ref={this._titleCanvas}
          style={{visibility: page === 1 ? 'visible' : 'hidden'}}
          onMouseEnter={this._canvasMouseEnterCallback}
          onMouseLeave={this._canvasMouseLeaveCallback}
        />
      </div>
    </div>
  }

  @boundMethod
  private _onResize(): void
  {
    if (this._currentMobile != this._getMobile())
    {
      this._canvasActive = true;
      this._animationRunning = 0;
      this._currentMobile = this._getMobile();
      this._initializeCanvas();
      this.setState(
        {
          page: 1,
          animationRun: false,
          contentAnimation: '',
          loading: false
        }
      );
    }
    else
    {
      this._titleCanvas.current.width = window.innerWidth;
      this._engine.resize();
      this._screenSizeObserver.notify(window.innerWidth);
      this._engine.stopRenderLoop();
      this._engine.runRenderLoop(() =>
      {
        this._renderCanvas();
      });
    }
  }

  @boundMethod
  private _initializeCanvas(): void
  {
    if (this._engine)
    {
      this._engine.stopRenderLoop();
    }
    this._engine = new Engine
    (
      this._titleCanvas.current,
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
    this._boxText.initiate(window.innerWidth);
    this._screenSizeObserver.attach(this._boxText);
    this._engine.runRenderLoop(() =>
    {
      this._renderCanvas();
    });
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
      this._engine.stopRenderLoop();
      this._engine.runRenderLoop(() =>
      {
        this._renderCanvas();
      });
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
      this._engine.stopRenderLoop();
      this._engine.runRenderLoop(() =>
      {
        this._renderCanvas();
      });
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
