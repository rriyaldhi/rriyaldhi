import EngineParametricSingleton from '../engine-singleton/EngineSingleton';
import SceneParametricSingleton from '../scene-singleton/SceneSingleton';
import {Color3, DynamicTexture, Engine, Scene, StandardMaterial} from 'babylonjs';
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
