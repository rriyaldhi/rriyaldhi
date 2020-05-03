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
import {Nullable} from "babylonjs/types";

export interface AppState
{
  page: number,
  contentClasses: Array<string>,
  buttonColor: Color
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _boxText: BoxText;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _content: any;
  private readonly _titleCanvas: any;
  private readonly _emailCanvas: any;
  private readonly _linkedInCanvas: any;

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._content = React.createRef();
    this._titleCanvas = React.createRef();
    this._emailCanvas = React.createRef();
    this._linkedInCanvas = React.createRef();
    this.state =
    {
      page: 1,
      contentClasses: [],
      buttonColor: new Color('white', 'black')
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
    const { page, contentClasses, buttonColor } = this.state;
    const contentClass: string = contentClasses.join(' ');
    const content = this._getContent();
    return <div id={'app'}>
      <div
        id={'button-container-up'}
        className={`animated ${page === 2 ? 'fadeIn' : 'fadeOut'}`}
        style={{display: page === 2 ? 'block' : 'none'}}
      >
        <Button color={buttonColor} wavesLight={true}>keyboard_arrow_up</Button>
      </div>
      <span className={'meta-description'}>once upon a time in a small town...</span>
      <div id={'content'} ref={this._content} className={contentClass} onAnimationEnd={this._contentAnimationEnd}>
        {content}
      </div>
      <div id={'button-container-down'} className={`animated ${page === 1 ? 'fadeIn' : 'fadeOut'}`}>
        <Button color={buttonColor} wavesLight={true} clickCallback={this._buttonDownClick}>keyboard_arrow_down</Button>
      </div>
    </div>
  }

  private _getContent(): any
  {
    const { page } = this.state;
    const pageId: string = `${page.toString()}`;
    if (page === 1)
    {
      return <canvas ref={this._titleCanvas} />
    }
    else if (page === 2)
    {
      return <div>
      </div>
    }
    return <div />
  }

  @boundMethod
  private _onResize(): void
  {
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
    new FreeCamera('camera', new Vector3(0, 0, -15), this._scene);
    this._boxText = new BoxText(
      this._scene,
      'rizky riyaldhi',
      1,
      BOX_COLOR,
      FONT_FAMILY,
      FONT_TYPE
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
  private _buttonDownClick(): void
  {
    this.setState({
      ...this.state,
      page: 2,
      contentClasses: ['animated', 'fadeOut']
    });
  }

  @boundMethod
  private _contentAnimationEnd()
  {
    this._screenSizeObserver.detach(this._boxText);
    this.setState({
      ...this.state,
      contentClasses: [],
    });

  }

}
