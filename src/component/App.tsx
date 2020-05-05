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
import {BOX_COLOR, FONT_FAMILY, FONT_TYPE, STORY_CONTENTS} from "./App.constant";

export interface AppState
{
  page: number,
  animationRun: boolean,
  contentAnimation: string,
  buttonColor: Color,
  buttonWavesLight: boolean,
  buttonContainerUpRender: boolean,
  buttonContainerDownRender: boolean,
  buttonContainerUpShow: boolean,
  buttonContainerDownShow: boolean,
  loading: boolean
}

export default class App extends React.Component<{}, AppState>
{
  private _engine: Engine;
  private _scene: Scene;
  private _boxText: BoxText;
  private _buttonClicked: number;
  private readonly _screenSizeObserver: ScreenSizeObserver;
  private readonly _content: React.RefObject<any>;
  private readonly _titleCanvas: React.RefObject<any>;

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
      buttonWavesLight: true,
      buttonContainerUpRender: false,
      buttonContainerDownRender: true,
      buttonContainerUpShow: true,
      buttonContainerDownShow: true,
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
    this._preloadImage();
  }

  render()
  {
    const { page, animationRun, contentAnimation, buttonColor, buttonWavesLight, buttonContainerUpRender, buttonContainerUpShow, buttonContainerDownRender, buttonContainerDownShow} = this.state;
    let multiplier = 1;
    const windowWidth = window.innerWidth;
    if (windowWidth < 720)
    {
      multiplier = 0.5;
    }

    return <div id={'app'}>
      {
        animationRun && buttonContainerUpRender && <div
          className={`button-container-up animated ${buttonContainerUpShow ? 'fadeIn' : 'fadeOut'}`}
          onAnimationEnd={this._buttonContainerUpAnimationEndCallback}
        >
          <Button color={buttonColor} wavesLight={buttonWavesLight} clickCallback={this._buttonUpClickCallback}>
            keyboard_arrow_up
          </Button>
        </div>
      }
      <span className={'meta-description'}>once upon a time in a small town...</span>
      <div
        ref={this._content}
        className={`content ${window.innerWidth < 720 ? '' : 'animated'} ${contentAnimation}`}
        onAnimationEnd={this._contentAnimationEndCallback}
      >
        <canvas ref={this._titleCanvas} style={{visibility: page === 1 ? 'visible' : 'hidden'}} />
        <div className={'contact'} style={{display: page === 2 ? 'block' : 'none'}}>
          <div className={'content'}>rriyaldhi@gmail.com</div>
          <div className={'content'}>linkedin.com/rriyaldhi</div>
        </div>
        {
          page > 2 && <div className={'story'} style={{display: page > 2 ? 'block' : 'none'}}>
            <div className={'image'}>
              <img src={`${STORY_CONTENTS[page - 3].image}.jpg`} width={multiplier * STORY_CONTENTS[page - 3].width}/>
            </div>
            <div
              className={'caption'}
              dangerouslySetInnerHTML={{ __html: STORY_CONTENTS[page - 3].caption }}
            />
          </div>
        }
      </div>
      {
        animationRun && buttonContainerDownRender && <div
          className={`button-container-down animated ${buttonContainerDownShow ? 'fadeIn' : 'fadeOut'}`}
          onAnimationEnd={this._buttonContainerDownAnimationEndCallback}
        >
          <Button color={buttonColor} wavesLight={buttonWavesLight} clickCallback={this._buttonDownClickCallback}>
            keyboard_arrow_down
          </Button>
        </div>
      }
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
    const { page, buttonContainerUpShow, buttonContainerDownShow, loading } = this.state;
    const mobile = this._getMobile();
    if (!loading || mobile)
    {
      this._buttonClicked = 1;
      if (page > 1)
      {
        const newPage = this._getNewPage();
        if (page == 2)
        {
          this.setState({
            ...this.state,
            contentAnimation: 'fadeOut',
            buttonColor: new Color('white', 'black'),
            buttonWavesLight: false,
            buttonContainerDownRender: true,
            loading: !mobile,

            page: mobile ? newPage : page,
            buttonContainerUpShow: mobile ? newPage != 1 : buttonContainerUpShow,
            buttonContainerDownShow: mobile ? newPage < STORY_CONTENTS.length + 2 : buttonContainerDownShow
          });
        }
        else
        {
          this.setState({
            ...this.state,
            contentAnimation: 'fadeOut',
            buttonContainerDownRender: true,
            loading: !mobile,

            page: mobile ? newPage : page,
            buttonContainerUpShow: mobile ? newPage != 1 : buttonContainerUpShow,
            buttonContainerDownShow: mobile ? newPage < STORY_CONTENTS.length + 2 : buttonContainerDownShow

          });
        }
      }
    }
  }

  @boundMethod
  private _buttonDownClickCallback(): void
  {
    const { page, buttonContainerUpShow, buttonContainerDownShow, loading } = this.state;
    const mobile = this._getMobile();
    if (!loading || mobile)
    {
      this._buttonClicked = 2;
      if ((page < STORY_CONTENTS.length + 2))
      {
        const newPage = this._getNewPage();
        if (page == 1)
        {
          this.setState({
            ...this.state,
            contentAnimation: 'fadeOut',
            buttonColor: new Color('black', 'white'),
            buttonWavesLight: false,
            buttonContainerUpRender: true,
            loading: !mobile,

            page: mobile ? newPage : page,
            buttonContainerUpShow: mobile ? newPage != 1 : buttonContainerUpShow,
            buttonContainerDownShow: mobile ? newPage < STORY_CONTENTS.length + 2 : buttonContainerDownShow
          });
        }
        else
        {
          this.setState({
            ...this.state,
            contentAnimation: 'fadeOut',
            buttonContainerUpRender: true,
            loading: !mobile,

            page: mobile ? newPage : page,
            buttonContainerUpShow: mobile ? newPage != 1 : buttonContainerUpShow,
            buttonContainerDownShow: mobile ? newPage < STORY_CONTENTS.length + 2 : buttonContainerDownShow
          });
        }
      }
    }
  }

  @boundMethod
  private _boxAnimationEndCallback(): void
  {
    this.setState({
      ...this.state,
      animationRun: true,
      buttonContainerDownShow: true
    });
  }

  @boundMethod
  private _contentAnimationEndCallback(): void
  {
    const mobile = this._getMobile();
    if (!mobile)
    {
      const {page, contentAnimation} = this.state;
      if (contentAnimation === 'fadeOut')
      {
        const newPage = this._getNewPage();
        this.setState({
          ...this.state,
          page: newPage,
          contentAnimation: page > 2 ? 'fadeIn faster' : 'fadeIn',
          buttonContainerUpShow: newPage != 1,
          buttonContainerDownShow: newPage < STORY_CONTENTS.length + 2,
          loading: false,
        });
        this._buttonClicked = -1;
      }
    }
  }

  @boundMethod
  private _buttonContainerUpAnimationEndCallback()
  {
    const { loading } = this.state;
    const mobile = this._getMobile();
    if (!mobile  && !loading)
    {
      const {buttonContainerUpShow} = this.state;
      if (!buttonContainerUpShow)
      {
        this.setState({
          ...this.state,
          buttonContainerUpRender: false,
          buttonContainerUpShow: true,
        })
      }
      else
      {
        this.setState({
          ...this.state,
        })
      }
    }
  }

  @boundMethod
  private _buttonContainerDownAnimationEndCallback()
  {
    const { loading } = this.state;
    const mobile = this._getMobile();
    if (!mobile && !loading)
    {
      const {buttonContainerDownShow} = this.state;
      if (!buttonContainerDownShow)
      {
        this.setState({
          ...this.state,
          buttonContainerDownRender: false,
          buttonContainerDownShow: true,
        })
      }
      else
      {
        this.setState({
          ...this.state,
        })
      }
    }
  }

  @boundMethod
  private _preloadImage()
  {
    for (var i = 0; i < STORY_CONTENTS.length; i++)
    {
      (new Image()).src = STORY_CONTENTS[i].image + '.jpg';
    }
  }

  @boundMethod
  private _getNewPage()
  {
    const { page } = this.state;
    let newPage = page;
    if (this._buttonClicked == 1)
    {
      if (page > 1)
        newPage = page - 1;
    }
    else
    {
      if (page < STORY_CONTENTS.length + 2)
        newPage = page + 1;
    }
    return newPage;
  }

  @boundMethod
  private _getMobile()
  {
    const width = window.innerWidth;
    return width < 720;

  }

}
