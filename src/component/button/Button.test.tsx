/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";
import Color from "../../utility/color/Color";

describe("Button", () => {
  it("should render button (without parameters)", () => {
    const { container } = render(<Button />);

    // Query for the button element
    const button = container.querySelector('a.btn-floating.waves-effect.white');

    // Check if the button exists in the DOM
    expect(button).not.toBeNull();

    // Check the inner HTML of the button's icon
    const icon = button.querySelector('i.material-icons');
    expect(icon).not.toBeNull();
    // @ts-ignore
    expect(icon.style.color).toBe('black'); // Verifying the color style
  });

  it("should render button (with parameters)", () => {
    const color = new Color('black', 'white');
    const { container } = render(
        <Button color={color} wavesLight={true}>keyboard_arrow_up</Button>
    );

    // Query for the button element
    const button = container.querySelector('a.btn-floating.waves-effect.waves-light.white');

    // Check if the button exists in the DOM
    expect(button).not.toBeNull();

    // Check the icon element
    const icon = button.querySelector('i.material-icons');
    expect(icon).not.toBeNull();
    expect(icon.textContent).toBe('keyboard_arrow_up'); // Verifying the icon content
    // @ts-ignore
    expect(icon.style.color).toBe('black'); // Verifying the color style
  });

  it("should run click callback", () => {
    const clickCallback = jest.fn();
    const { container } = render(<Button clickCallback={clickCallback}></Button>);

    // Query for the button element
    const button = container.querySelector('a');

    // Simulate the click event
    button.click();

    // Verify the callback is called
    expect(clickCallback).toHaveBeenCalledTimes(1);
  });
});
