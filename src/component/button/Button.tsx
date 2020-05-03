import * as React from "react";
import './Button.sass'
import Color from "../../utility/color/Color";
import {boundMethod} from "autobind-decorator";

export interface ButtonProp
{
  color?: Color,
  wavesLight?: boolean,
  clickCallback?: Function,
  children?: Node | string
}

export default class Button extends React.Component<ButtonProp, {}>
{
  constructor(props: ButtonProp)
  {
    super(props);
  }

  render()
  {
    const { children } = this.props;
    const color = this.getColor();
    const wavesLight = this.getWavesLight();
    return <a className={`btn-floating waves-effect ${wavesLight ? 'waves-light': ''} ${color.back}`} onClick={this._clickCallback}>
      <i className="material-icons" style={{color: color.fore}}>{ children }</i>
    </a>
  }

  @boundMethod
  private _clickCallback(): void
  {
    const { clickCallback } = this.props;
    clickCallback();
  }

  @boundMethod
  private getColor()
  {
    const { color } = this.props;
    if (color != null)
    {
      return color;
    }
    return new Color('black', 'white');
  }

  @boundMethod
  private getWavesLight()
  {
    const { wavesLight } = this.props;
    if (wavesLight) {
      return wavesLight;
    }
    return false;
  }
}
