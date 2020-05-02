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

export default class App extends React.Component<{}, {}>
{
  private _engine: Engine;
  private _scene: Scene;
  private _camera: FreeCamera;
  private _title: BoxText;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _canvas: any;

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._canvas = React.createRef();
    this._onResize = this._onResize.bind(this);
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

  _onResize(): void
  {
    this._engine.resize();
    this._screenSizeObserver.notify(window.innerWidth);
  }

  render()
  {
    return <div id={'app'}>
      <span className={'meta-description'}>once upon a time in a small town...</span>
      <div id={'title'}>
        <canvas ref={this._canvas} />
      </div>
    </div>
  }

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

  private _renderTitle(): void
  {
    if (this && this._scene)
    {
      this._scene.render();
    }
  }



}
