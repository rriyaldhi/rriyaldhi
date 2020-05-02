import * as React from "react";
import { shallow } from "enzyme";
import {App} from "./App";
import DirectionButton, {Direction as ButtonDirection} from "./direction-button/DirectionButton";

it("render app", () => {
  const result = shallow(<App />)
    .equals(<div id={'app'}>
      <span className={'meta-description'}>Once upon a time in a small town...</span>
      <DirectionButton direction={ButtonDirection.DOWN} />
    </div>);
  expect(result).toBeTruthy();
});
