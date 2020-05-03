import * as React from "react";
import { shallow } from "enzyme";
import Button from "./Button";
import Color from "../../utility/color/Color";

describe("Button", () =>
{
  it("should render button (without parameters)", () =>
  {
    const actual = shallow(<Button />);
    const expected = shallow(<a className={`btn-floating waves-effect  white`}>
      <i className="material-icons" style={{color: 'black'}}></i>
    </a>);
    expect(actual.html()).toEqual(expected.html());
  });

  it("should render button (with parameters)", () =>
  {
    const color = new Color('black', 'white');
    const actual = shallow(<Button color={color} wavesLight={true}>keyboard_arrow_up</Button>);
    const expected = shallow(<a className={`btn-floating waves-effect waves-light white`}>
      <i className="material-icons" style={{color: 'black'}}>keyboard_arrow_up</i>
    </a>);
    expect(actual.html()).toEqual(expected.html());
  });

  it("should run click callback", () =>
  {
    const clickCallback = jest.fn();
    const button = shallow(<Button clickCallback={clickCallback}></Button>);
    button.find('a').simulate('click');
    expect(clickCallback.mock.calls.length).toEqual(1);
  });

});

