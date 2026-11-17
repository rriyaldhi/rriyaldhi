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
  hasCanvas: boolean,
  hasNavigated: boolean
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _boxText: BoxText;
  private _canvasActive: boolean;
  private _screenWidth: number;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _titleCanvas = React.createRef<HTMLCanvasElement>();
  private readonly _menu = React.createRef<HTMLElement>();
  private readonly _back = React.createRef<HTMLAnchorElement>();

  constructor(props: any)
  {
    super(props);
    this._screenSizeObserver = ScreenSizeObserverSingleton.getInstance();
    this._canvasActive = false;
    this.state =
    {
      section: getActiveSection(),
      hasCanvas: false,
      hasNavigated: false
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
    if (this._boxText)
    {
      this._screenSizeObserver.detach(this._boxText);
      this._boxText.dispose();
    }
    this._engine?.dispose();
  }

  render()
  {
    const { section, hasCanvas, hasNavigated } = this.state;

    return <main id="app">
      <header className="site-header" data-section-open={!!section} data-canvas-ready={hasCanvas}
        data-has-navigated={hasNavigated}>
        <canvas
          className="site-title-canvas"
          aria-hidden="true"
          ref={this._titleCanvas}
          onPointerEnter={this._canvasPointerEnterCallback}
          onPointerLeave={this._canvasPointerLeaveCallback}
        />
        <h1 className="site-name">rizky riyaldhi</h1>
        {section ? <a className="site-back" ref={this._back} href="#">
          <span aria-hidden="true">←</span> Back to home
        </a> : <nav className="site-menu" aria-label="Sections" ref={this._menu}>
          {sections.map(({ id, label }) => <a
            key={id}
            href={`#${id}`}
          >{label}</a>)}
        </nav>}
      </header>
      {sections.map(({ id, Content }) => <div className="site-section" key={id}
        hidden={section !== id} inert={section !== id}>
        <Content active={section === id} />
      </div>)}
    </main>
  }

  @boundMethod
  private _onSectionChange(): void
  {
    const section = getActiveSection();
    const previous = this.state.section;
    if (section === previous) return;

    this.setState({ section, hasNavigated: true }, () =>
    {
      window.scrollTo(0, 0);
      const target = section ? this._back.current : this._menu.current?.querySelector<HTMLAnchorElement>(
        `[href="#${previous}"]`
      );
      target?.focus({ preventScroll: true });
    });
  }

  @boundMethod
  private _onResize(): void
  {
    if (!this._engine) return;

    this._engine.resize();
    const width = window.innerWidth;
    if (width !== this._screenWidth)
    {
      this._screenWidth = width;
      this._screenSizeObserver.notify(width);
    }
    this._renderCanvas();
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
      FONT_TYPE
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
    this._scene.render();
    if (!this._canvasActive && this._scene.animatables.length === 0)
    {
      this._engine.stopRenderLoop(this._renderCanvas);
    }
  }

  @boundMethod
  private _canvasPointerEnterCallback(): void
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
    this._scene?.setPointerOverMesh(null, event.pointerId);
  }

  @boundMethod
  private _onWindowFocus(): void
  {
    if (this._canvasActive || this._scene?.animatables.length)
    {
      this._engine?.runRenderLoop(this._renderCanvas);
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
