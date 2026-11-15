import type { Engine } from '@babylonjs/core/Engines/engine.js';
import { Color4 } from '@babylonjs/core/Maths/math.color.js';
import { Scene } from '@babylonjs/core/scene.js';

export default class SceneSingleton
{
  private static _instanceMap: Map<Engine, Scene>;

  private constructor() {}

  public static getInstance(engine?: Engine): Scene
  {
    if (SceneSingleton._instanceMap == null || !SceneSingleton._instanceMap.has(engine))
    {
      const scene: Scene = new Scene(engine);
      scene.clearColor = new Color4(1, 1, 1, 1);
      scene.blockMaterialDirtyMechanism = true;
      if (SceneSingleton._instanceMap == null)
      {
        SceneSingleton._instanceMap = new Map<Engine, Scene>();
      }
      SceneSingleton._instanceMap.set(engine, scene);
      return scene;
    }
    return SceneSingleton._instanceMap.get(engine);
  }
}
