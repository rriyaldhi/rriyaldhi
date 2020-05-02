import * as React from "react";
import { shallow } from "enzyme";
import App from "./App";
import {Engine} from "babylonjs/Engines/engine";
import EngineSingleton from "../utility/3d/engine-singleton/EngineSingleton";
import SceneSingleton from "../utility/3d/scene-singleton/SceneSingleton";
import {Vector3, FreeCamera} from "babylonjs";

// @ts-ignore
window.document.fonts = {
  load: () =>
  {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
};

describe("App", () =>
{
  let app: App;
  beforeEach(() =>
  {
    app = new App({});
  });

  it("should render app", () =>
  {
    const result = shallow(<App />)
      .equals(<div id={'app'}>
        <span className={'meta-description'}>once upon a time in a small town...</span>
        <div id={'title'}>
          <canvas />
        </div>
      </div>);
    expect(result).toBeTruthy();
  });

  it('should create the app', () =>
  {
    app.componentDidMount();
    expect(app).toBeTruthy();
  });

  it('should be able to resize', () =>
  {
    app['_init']();
    app._onResize();
  });

  it('should be able to render', () =>
  {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const engine: Engine = EngineSingleton.getInstance(canvas);
    app['_scene'] = SceneSingleton.getInstance(engine);
    app['_camera'] = new FreeCamera('camera', new Vector3(0, 0, -10), app['_scene']);
    app['_renderTitle']();
  });

});
