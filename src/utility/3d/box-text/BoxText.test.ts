import {Engine} from 'babylonjs';
import {Scene} from 'babylonjs/scene';
import {BoxText} from "./BoxText";
import EngineSingleton from "../engine-singleton/EngineSingleton";
import SceneSingleton from "../scene-singleton/SceneSingleton";
import Color from "../../color/Color";

describe('Text', () =>
{
  let text: BoxText;

  beforeEach(() =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    const scene: Scene = SceneSingleton.getInstance(engine);
    const color: Color = new Color('white', 'black');
    text = new BoxText(
      scene,
      'test',
      1,
      color,
      'san-francisco',
      'normal'
    );
  });

  it('should be okay when initiated for desktop', () =>
  {
    text.initiate(1280);
  });

  it('should be okay when initiated for tablet', () =>
  {
    text.initiate(960);
  });

  it('should be okay when initiated for mobile', () =>
  {
    text.initiate(480);
  });

  it('should be able to be disposed', () =>
  {
    text.initiate(1280);
    // noinspection TsLint
    text['dispose']();
  });

  it('should be re-initiated when screen size changes', () =>
  {
    spyOn(text, 'initiate');
    text.onScreenSizeUpdate(1280);
    expect(text.initiate).toHaveBeenCalledTimes(1);
  });
});
