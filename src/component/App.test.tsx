import * as React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import App, {AppState} from "./App";
import {Engine} from "babylonjs/Engines/engine";
import EngineSingleton from "../utility/3d/engine-singleton/EngineSingleton";
import SceneSingleton from "../utility/3d/scene-singleton/SceneSingleton";
import {Vector3, FreeCamera} from "babylonjs";
import Button, {ButtonProp} from "./button/Button";
import Color from "../utility/color/Color";

// @ts-ignore
window.document.fonts = {
  load: () =>
  {
    return new Promise(function(resolve) {
      resolve();
    });
  }
};

// describe("App", () =>
// {
//   let app: App;
//   beforeEach(() =>
//   {
//     app = new App({});
//   });
//
//   it("should render app", () =>
//   {
//     const actual = shallow(<App />);
//     const expected = shallow(<div id={'app'}>
//         <span className={'meta-description'}>once upon a time in a small town...</span>
//         <div id={'content'} className={''}>
//           <canvas />
//         </div>
//         <div id={'button-container-down'}>
//           <Button color={new Color('white', 'black')}>keyboard_arrow_down</Button>
//         </div>
//       </div>);
//     expect(actual.html()).toEqual(expected.html());
//   });
//
//   it('should create the app', () =>
//   {
//     app.componentDidMount();
//     expect(app).toBeTruthy();
//   });
//
//   it('should be able to resize', () =>
//   {
//     app['_initializeCanvas'](null, null, null);
//     app['_onResize']();
//   });
//
//   it('should be able to render title', () =>
//   {
//     const canvas: HTMLCanvasElement = document.createElement('canvas');
//     const engine: Engine = EngineSingleton.getInstance(canvas);
//     app['_scene'] = SceneSingleton.getInstance(engine);
//     app['_camera'] = new FreeCamera('camera', new Vector3(0, 0, -10), app['_scene']);
//     app['_renderCanvas']();
//   });
//
//   it('should be able to change content', () =>
//   {
//     const app: ShallowWrapper<object, AppState, App> = shallow<App, object, AppState>(<App />);
//     const button: ShallowWrapper<ButtonProp, object, Button> = app.find<Button>(Button);
//     button.dive().find('a').simulate('click');
//     const expected =
//     {
//       contentClasses: ['animated', 'fadeOut'],
//       buttonColor: new Color('black', 'white')
//     };
//     expect(app.state<Array<string>>('contentClasses')).toEqual(expected.contentClasses);
//     expect(app.state<Color>('buttonColor').fore).toEqual(expected.buttonColor.fore);
//     expect(app.state<Color>('buttonColor').back).toEqual(expected.buttonColor.back);
//   })
//
// });
