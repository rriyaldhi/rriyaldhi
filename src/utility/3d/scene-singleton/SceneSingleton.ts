import {Color4, Engine, Scene} from 'babylonjs';

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
