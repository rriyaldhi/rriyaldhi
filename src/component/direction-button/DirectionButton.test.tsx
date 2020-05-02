import * as React from "react";
import { shallow } from "enzyme";
import DirectionButton, {Color, Direction} from "./DirectionButton";

describe("DirectionButton", () =>
{
  it("should render white button", () =>
  {
    const result = shallow(<DirectionButton
      direction={Direction.DOWN}
      color={Color.WHITE}
    />)
      .equals(<a
        className={`button btn-floating waves-effect ${Color.WHITE}`}
        style={{color: Color.BLACK}}
      >
        <i className="material-icons">{ Direction.DOWN }</i>
      </a>);
    expect(result).toBeTruthy();
  });

  it("should render black button", () =>
  {
    const result = shallow(<DirectionButton
      direction={Direction.DOWN}
      color={Color.BLACK}
    />)
      .equals(<a
        className={`button btn-floating waves-effect ${Color.BLACK}`}
        style={{color: Color.WHITE}}
      >
        <i className="material-icons">{ Direction.DOWN }</i>
      </a>);
    expect(result).toBeTruthy();
  });

});

