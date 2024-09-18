/**
 * @jest-environment jsdom
 */

import SceneSingleton from './SceneSingleton';
import EngineSingleton from '../engine-singleton/EngineSingleton';
import {Engine, Scene} from 'babylonjs';

describe('SceneSingleton', () =>
{
  it('should get the same scene', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    const scene1: Scene = SceneSingleton.getInstance(engine);
    const scene2: Scene = SceneSingleton.getInstance(engine);
    expect(scene1).toEqual(scene2);
  });

  it('should get different scene', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    const scene1: Scene = SceneSingleton.getInstance(engine);
    const canvas2: HTMLCanvasElement = document.createElement('canvas');
    const engine2: Engine = EngineSingleton.getInstance(canvas2);
    const scene2: Scene = SceneSingleton.getInstance(engine2);
    expect(scene1).not.toEqual(scene2);
  });
});
