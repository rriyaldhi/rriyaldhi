import * as React from "react";
import "./App.sass";
import Bookshelf from "./Bookshelf";
import Travel from "./Travel";
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

const sections = [
  { id: "books", label: "Books", Content: Bookshelf },
  { id: "travel", label: "Travel", Content: Travel },
] as const;

type Section = typeof sections[number]["id"];

function getActiveSection(): Section | undefined
{
  return sections.find(({ id }) => window.location.hash === `#${id}`)?.id;
}

interface AppState
{
  section: Section | undefined,
  hasCanvas: boolean
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
      section: getActiveSection(),
      hasCanvas: false
    }
  }

  componentDidMount(): void
  {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    {
      document.fonts.load('10pt "' + FONT_FAMILY + '"')
        .catch(() => { /* The canvas can use its fallback font. */ })
        .then(this._initializeCanvas);
    }
    window.addEventListener("hashchange", this._onSectionChange);
    window.addEventListener("resize", this._onResize);
    window.addEventListener("focus", this._onWindowFocus);
    window.addEventListener("blur", this._onWindowLeave);
  }

  componentWillUnmount(): void
  {
    window.removeEventListener("hashchange", this._onSectionChange);
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("focus", this._onWindowFocus);
    window.removeEventListener("blur", this._onWindowLeave);
    if (this._boxText) this._screenSizeObserver.detach(this._boxText);
    this._engine?.dispose();
  }

  render()
  {
    const { section, hasCanvas } = this.state;

    return <main id="app">
      <header className="site-header" data-section-open={!!section} data-canvas-ready={hasCanvas}>
        <canvas
          className="site-title-canvas"
          aria-hidden="true"
          ref={this._titleCanvas}
          onMouseEnter={this._canvasMouseEnterCallback}
          onPointerLeave={this._canvasPointerLeaveCallback}
        />
        <h1 className="site-name"><a href="#">rizky riyaldhi</a></h1>
        <nav className="site-menu" aria-label="Sections">
          {section && <a href="#"><span aria-hidden="true">←</span> Home</a>}
          {sections.map(({ id, label }) => <a
            key={id}
            href={`#${id}`}
            aria-current={section === id ? "page" : undefined}
          >{label}</a>)}
        </nav>
      </header>
      {sections.map(({ id, Content }) => <div className="site-section" key={id} hidden={section !== id}>
        <Content />
      </div>)}
    </main>
  }

  @boundMethod
  private _onSectionChange(): void
  {
    this.setState({ section: getActiveSection() }, () => window.scrollTo(0, 0));
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
    }
    this._engine.runRenderLoop(this._renderCanvas);
  }

  @boundMethod
  private _initializeCanvas(): void
  {
    const canvas = this._titleCanvas.current;
    if (!canvas || !Engine.isSupported()) return;
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
    this.setState({ hasCanvas: true });
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
    if (window.innerWidth < 720)
    {
      this._boxAnimationEndCallback();
    }
  }

  @boundMethod
  private _boxAnimationEndCallback(): void
  {
    if (this._animationRunning > 0)
    {
      this._animationRunning--;
    }
    if (this._animationRunning === 0 && !this._canvasActive)
    {
      this._engine?.stopRenderLoop();
    }
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
  private _canvasPointerLeaveCallback(event: React.PointerEvent<HTMLCanvasElement>): void
  {
    this._canvasActive = false;
    // Babylon runs its pointer-out action when picking changes. Leaving the canvas skips picking.
    if (this._scene?.getPointerOverMesh())
    {
      this._scene.setPointerOverMesh(null, event.pointerId);
    }
    else if (this._animationRunning === 0)
    {
      this._engine?.stopRenderLoop();
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
