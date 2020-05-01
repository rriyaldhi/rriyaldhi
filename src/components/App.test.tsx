import * as React from "react";
import { shallow } from "enzyme";
import {App} from "./App";
import 'materialize-css';

it("renders app", () => {
  const result = shallow(<App />)
    .equals(<div id={'app'}>
      <span style={{display: 'none'}}>Once upon a time in a small town...</span>
    </div>);
  expect(result).toBeTruthy();
});
