import * as React from "react";
import { shallow } from "enzyme";
import DirectionButton, {Color, Direction} from "./DirectionButton";

describe("DirectionButton", () =>
{
  it("should render white button", () =>
  {
    const actual = shallow(<DirectionButton
      direction={Direction.DOWN}
      color={Color.WHITE}
    />);
    const expected = shallow(<a className={`btn-floating waves-effect  ${Color.WHITE}`}>
      <i className="material-icons" style={{color: Color.BLACK}}>{ Direction.DOWN }</i>
    </a>);
    expect(actual.html()).toEqual(expected.html());
  });

  it("should render black button", () =>
  {
    const actual = shallow(<DirectionButton
      direction={Direction.DOWN}
      color={Color.BLACK}
    />);
    const expected = shallow(<a className={`btn-floating waves-effect waves-light ${Color.BLACK}`}>
      <i className="material-icons" style={{color: Color.WHITE}}>{ Direction.DOWN }</i>
    </a>);
    expect(actual.html()).toEqual(expected.html());
  });

  it("should run _clickCallback", () =>
  {
    const directionButton: DirectionButton = new DirectionButton({
      direction: Direction.DOWN,
      color: Color.WHITE,
      clickCallback: () => {}
    });
    directionButton['_clickCallback']();
  });

});

