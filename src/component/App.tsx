import * as React from "react";
import "./App.sass";
import {Engine} from "babylonjs/Engines/engine";
import {Scene} from "babylonjs/scene";
import {ScreenSizeObserverSingleton} from "../utility/screen-size-observer/ScreenSizeObserverSingleton";
import ScreenSizeObserver from "../utility/screen-size-observer/ScreenSizeObserver";
import EngineSingleton from "../utility/3d/engine-singleton/EngineSingleton";
import SceneSingleton from "../utility/3d/scene-singleton/SceneSingleton";
import {BoxText} from "../utility/3d/box-text/BoxText";
import Color from "../utility/color/Color";
import {Vector3, FreeCamera} from "babylonjs";
import {boundMethod} from 'autobind-decorator';
import Button from "./button/Button";

export interface AppState
{
  contentClasses: Array<string>,
  buttonColor: Color
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _camera: FreeCamera;
  private _title: BoxText;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _content: any;
  private readonly _canvas: any;

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._content = React.createRef();
    this._canvas = React.createRef();
    this.state =
    {
      contentClasses: [],
      buttonColor: new Color('white', 'black')
    }
  }

  componentDidMount(): void
  {
    // @ts-ignore
    document.fonts.load('10pt "san-francisco"').then(() =>
      {
        this._init();
      });
    window.addEventListener("resize", this._onResize);
  }

  render()
  {
    const { contentClasses, buttonColor } = this.state;
    const contentClass: string = contentClasses.join(' ');
    return <div id={'app'}>
      <span className={'meta-description'}>once upon a time in a small town...</span>
      <div id={'content'} className={contentClass}>
        <canvas ref={this._canvas} />
      </div>
      <div id={'button-container-down'}>
        <Button color={buttonColor} clickCallback={this._buttonDownClick}>keyboard_arrow_down</Button>
      </div>
    </div>
  }

  @boundMethod
  private _onResize(): void
  {
    this._engine.resize();
    this._screenSizeObserver.notify(window.innerWidth);
  }

  @boundMethod
  private _init(): void
  {
    this._engine = EngineSingleton.getInstance(this._canvas.current);
    this._engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this._scene = SceneSingleton.getInstance(this._engine);
    this._camera = new FreeCamera('camera', new Vector3(0, 0, -10), this._scene);
    this._title = new BoxText(
      this._scene,
      'rizky riyaldhi',
      0.8,
       new Color('black', 'white'),
      'san-francisco',
      'normal'
    );
    this._title.initiate(window.innerWidth);
    this._screenSizeObserver.attach(this._title);
    this._engine.runRenderLoop(() => this._renderTitle());
  }

  @boundMethod
  private _renderTitle(): void
  {
    if (this && this._scene)
    {
      this._scene.render();
    }
  }

  @boundMethod
  private _buttonDownClick(): void
  {
    const { contentClasses } = this.state;
    contentClasses.push('animated');
    contentClasses.push('fadeOut');
    this.setState({
      ...this.state,
      contentClasses,
      buttonColor: new Color('black', 'white'),
    });
  }

}
