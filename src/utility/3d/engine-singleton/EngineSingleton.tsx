import { Engine, NullEngine } from 'babylonjs';
import {Nullable} from "babylonjs/types";

export default class EngineSingleton
{
  private static _instanceMap: Map<Nullable<HTMLCanvasElement | WebGLRenderingContext>, Engine>;

  private constructor() {}

  public static getInstance(canvas: Nullable<HTMLCanvasElement | WebGLRenderingContext>): Engine
  {
    if (EngineSingleton._instanceMap == null || !EngineSingleton._instanceMap.has(canvas))
    {
      let engine: Engine;
      try
      {
        engine = new Engine
        (
          canvas,
          true,
          {
            preserveDrawingBuffer: true,
            stencil: true
          }
        );
      }
      catch (error)
      {
        engine = new NullEngine();
      }
      if (EngineSingleton._instanceMap == null)
      {
        EngineSingleton._instanceMap = new Map<Nullable<HTMLCanvasElement | WebGLRenderingContext>, Engine>();
      }
      EngineSingleton._instanceMap.set(canvas, engine);
      return engine;
    }
    return EngineSingleton._instanceMap.get(canvas);
  }

}

