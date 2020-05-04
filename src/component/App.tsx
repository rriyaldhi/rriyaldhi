import * as React from "react";
import "./App.sass";
import {Color4, Engine, Scene} from 'babylonjs';
import {ScreenSizeObserverSingleton} from "../utility/screen-size-observer/ScreenSizeObserverSingleton";
import ScreenSizeObserver from "../utility/screen-size-observer/ScreenSizeObserver";
import {BoxText} from "../utility/3d/box-text/BoxText";
import Color from "../utility/color/Color";
import {Vector3, FreeCamera} from "babylonjs";
import {boundMethod} from 'autobind-decorator';
import Button from "./button/Button";
import {BOX_COLOR, FONT_FAMILY, FONT_TYPE} from "./App.constant";

export interface AppState
{
  page: number,
  animationRun: boolean,
  contentAnimation: string,
  buttonColor: Color,
  buttonWavesLight: boolean,
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _boxText: BoxText;
  private _buttonClicked: number;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _content: any;
  private readonly _titleCanvas: any;

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._content = React.createRef();
    this._titleCanvas = React.createRef();
    this._buttonClicked = -1;
    this.state =
    {
      page: 1,
      animationRun: false,
      contentAnimation: '',
      buttonColor: new Color('white', 'black'),
      buttonWavesLight: false
    }
  }

  componentDidMount(): void
  {
    // @ts-ignore
    document.fonts.load('10pt "san-francisco"').then(() =>
    {
      this._initializeCanvas();
    });
    window.addEventListener("resize", this._onResize);
  }

  render()
  {
    const { page, animationRun, contentAnimation, buttonColor, buttonWavesLight } = this.state;
    return <div id={'app'}>
      <div
        className={`button-container-up animated ${page === 2 ? 'fadeIn' : 'fadeOut'}`}
        style={{display: page === 2 ? 'block' : 'none'}}
      >
        <Button color={buttonColor} wavesLight={buttonWavesLight} clickCallback={this._buttonUpClickCallback}>
          keyboard_arrow_up
        </Button>
      </div>
      <span className={'meta-description'}>once upon a time in a small town...</span>
      <div
        ref={this._content}
        className={`content animated ${contentAnimation}`}
        onAnimationEnd={this._contentAnimationEndCallback}
      >
        <canvas ref={this._titleCanvas} style={{visibility: page === 1 ? 'visible' : 'hidden'}} />
        <div className={'contact'} style={{display: page === 2 ? 'block' : 'none'}}>
          <div className={'content'}>rriyaldhi@gmail.com</div>
          <div className={'content'}>linkedin.com/rriyaldhi</div>
        </div>
      </div>
      <div
        className={`button-container-down animated ${page === 1 && animationRun ? 'fadeIn' : 'fadeOut'}`}
        style={{display: animationRun ? 'block' : 'none'}}
      >
        <Button color={buttonColor} wavesLight={buttonWavesLight} clickCallback={this._buttonDownClickCallback}>
          keyboard_arrow_down
        </Button>
      </div>
    </div>
  }

  @boundMethod
  private _onResize(): void
  {
    this._titleCanvas.current.width = 0.8 * window.innerWidth;
    this._engine.resize();
    this._screenSizeObserver.notify(window.innerWidth);
  }

  @boundMethod
  private _initializeCanvas(): void
  {
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
  private _buttonUpClickCallback(): void
  {
    const { page } = this.state;
    this._buttonClicked = 1;
    if (page == 2)
    {
      this.setState({
        ...this.state,
        contentAnimation: 'fadeOut',
        buttonColor: new Color('white', 'black'),
        buttonWavesLight: false
      });
    }
    else
    {
      this.setState({
        ...this.state,
        contentAnimation: 'fadeOut',
      });
    }
  }

  @boundMethod
  private _buttonDownClickCallback(): void
  {
    const { page } = this.state;
    this._buttonClicked = 2;
    if (page == 1)
    {
      this.setState({
        ...this.state,
        contentAnimation: 'fadeOut',
        buttonColor: new Color('black', 'white'),
        buttonWavesLight: true
      });
    }
    else
    {
      this.setState({
        ...this.state,
        contentAnimation: 'fadeOut',
      });
    }
  }

  @boundMethod
  private _boxAnimationEndCallback(): void
  {
    this.setState({
      ...this.state,
      animationRun: true,
    });
  }

  @boundMethod
  private _contentAnimationEndCallback(): void
  {
    const { page, contentAnimation } = this.state;
    if (contentAnimation === 'fadeOut')
    {
      this.setState({
        ...this.state,
        page: this._buttonClicked == 1 ? page - 1 : page + 1,
        contentAnimation: 'fadeIn',
      });
      this._buttonClicked = -1;
    }
  }
}
