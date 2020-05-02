import * as React from "react";
import { shallow } from "enzyme";
import App from "./App";
import DirectionButton, {Color, Direction} from "./direction-button/DirectionButton";

describe("App", () =>
{
  it("should render app", () =>
  {
    const result = shallow(<App />)
      .equals(<div id={'app'}>
        <span className={'meta-description'}>Once upon a time in a small town...</span>
      </div>);
    expect(result).toBeTruthy();
  });
});
