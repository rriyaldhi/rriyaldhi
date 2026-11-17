/**
 * @jest-environment jsdom
 */

import type { Engine } from '@babylonjs/core/Engines/engine.js';
import type { Scene } from '@babylonjs/core/scene.js';
import {BoxText} from "./BoxText";
import EngineSingleton from "../engine-singleton/EngineSingleton";
import SceneSingleton from "../scene-singleton/SceneSingleton";
import Color from "../../color/Color";

describe('Text', () =>
{
  let text: BoxText;
  let scene: Scene;

  beforeEach(() =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    scene = SceneSingleton.getInstance(engine);
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
    text.dispose();
  });

  it('should be re-initiated when screen size changes', () =>
  {
    jest.spyOn(text, 'initiate');
    text.onScreenSizeUpdate(1280);
    expect(text.initiate).toHaveBeenCalledTimes(1);
  });

  it('releases the old textures when rebuilding the title', () =>
  {
    const originalTextures = scene.textures.length;
    text.initiate(375);
    const texturesAfterBuild = scene.textures.length;
    expect(texturesAfterBuild).toBeGreaterThan(originalTextures);

    text.onScreenSizeUpdate(667);
    expect(scene.textures.length).toBe(texturesAfterBuild);

    text.dispose();
    expect(scene.textures.length).toBe(originalTextures);
  });

  it('releases pointer actions when resizing before the entrance finishes', () =>
  {
    const originalActions = scene.actionManagers.length;
    text.initiate(375);
    text.onScreenSizeUpdate(667);
    text.dispose();
    expect(scene.actionManagers.length).toBe(originalActions);
  });

});
