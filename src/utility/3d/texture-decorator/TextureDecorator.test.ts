/**
 * @jest-environment jsdom
 */

import {DynamicTexture, Engine} from 'babylonjs';
import {Scene} from 'babylonjs/scene';
import TextureDecorator from "./TextureDecorator";
import Font from "../../font/Font";
import Color from "../../color/Color";
import Point from "../../point/Point";
import EngineSingleton from "../engine-singleton/EngineSingleton";
import SceneSingleton from "../scene-singleton/SceneSingleton";

describe('TextureDecorator', () =>
{
  let dynamicTexture: DynamicTexture;

  beforeEach(() =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    const scene: Scene = SceneSingleton.getInstance(engine);
    dynamicTexture = new DynamicTexture('textureBottom', {
      width: 1024,
      height: 1024
    }, scene, null);
  });

  it('should be able to draw text', () =>
  {
    const textureDecorator: TextureDecorator = new TextureDecorator(dynamicTexture);
    const texture: DynamicTexture = textureDecorator.dynamicTexture;
    jest.spyOn(texture, 'drawText');
    textureDecorator.drawText(
      'test',
      new Font(
        null,
        null,
        null,
        new Color(),
        new Point()
      )
    );
    expect(dynamicTexture.drawText).toHaveBeenCalledTimes(1);
  });

  it('should be able to rotate', () =>
  {
    const textureDecorator: TextureDecorator = new TextureDecorator(dynamicTexture);
    textureDecorator.rotate(0, 0, Math.PI / 2);
    expect(dynamicTexture.uAng).toEqual(0);
    expect(dynamicTexture.vAng).toEqual(0);
    expect(dynamicTexture.wAng).toEqual(Math.PI / 2);
  });
});
