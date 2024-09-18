/**
 * @jest-environment jsdom
 */

import * as React from "react";
import EngineSingleton from "./EngineSingleton";
import {Engine} from "babylonjs/Engines/engine";

describe('EngineSingleton', () =>
{
  it('should get the same engine', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine1: Engine = EngineSingleton.getInstance(canvas);
    const engine2: Engine = EngineSingleton.getInstance(canvas);
    expect(engine1).toEqual(engine2);
  });

  it('should get different engine', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine1: Engine = EngineSingleton.getInstance(canvas);
    const canvas2: HTMLCanvasElement = document.createElement('canvas');
    const engine2: Engine = EngineSingleton.getInstance(canvas2);
    expect(engine1).not.toEqual(engine2);
  });
});
