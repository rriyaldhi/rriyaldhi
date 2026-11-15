/**
 * @jest-environment jsdom
 */

import EngineParametricSingleton from '../engine-singleton/EngineSingleton';
import SceneParametricSingleton from '../scene-singleton/SceneSingleton';
import type { Engine } from '@babylonjs/core/Engines/engine.js';
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture.js';
import type { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Color3 } from '@babylonjs/core/Maths/math.color.js';
import type { Scene } from '@babylonjs/core/scene.js';
import MaterialFactory from "./MaterialFactory";

describe('MaterialFactory', () =>
{
  it('should build standard material', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineParametricSingleton.getInstance(canvas);
    const scene: Scene = SceneParametricSingleton.getInstance(engine);
    const texture: DynamicTexture = new DynamicTexture('textureBottom', {
      width: 1024,
      height: 1024
    }, scene, null);
    const color: Color3 = Color3.White();
    const standardMaterial: StandardMaterial = MaterialFactory.buildStandardMaterial('material', scene, texture, color);
    expect(standardMaterial.diffuseTexture).toEqual(texture);
    expect(standardMaterial.emissiveColor).toEqual(color);
  });
});
