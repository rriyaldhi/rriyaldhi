import * as React from "react";
import { shallow } from "enzyme";
import DirectionButton, {Direction as ButtonDirection} from "./DirectionButton";

it("render direction button", () => {
  const result = shallow(<DirectionButton direction={ButtonDirection.DOWN}/>)
    .equals(<a className={'button btn-floating waves-effect white'}>
      <i className="material-icons">keyboard_arrow_down</i>
    </a>);
  expect(result).toBeTruthy();
});
