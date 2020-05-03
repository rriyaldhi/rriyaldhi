import * as React from "react";
import './DirectionButton.sass'

export const Direction: any =
{
  UP: 'keyboard_arrow_up',
  DOWN: 'keyboard_arrow_down',
  RIGHT: 'keyboard_arrow_right',
  LEFT: 'keyboard_arrow_left'
};

export const Color: any =
{
  WHITE: 'white',
  BLACK: 'black'
};

interface Prop
{
  direction: any,
  color: any,
  clickCallback?: Function
}

export default class DirectionButton extends React.Component<Prop, {}>
{
  constructor(props: Prop)
  {
    super(props);
    this._clickCallback = this._clickCallback.bind(this);
  }

  render()
  {
    const { direction, color } = this.props;
    const textColor: string = DirectionButton._getTextColor(color);
    const wavesColor: string = DirectionButton._getWavesColor(color);
    return <a className={`btn-floating waves-effect ${wavesColor} ${color}`} onClick={this._clickCallback}>
      <i className="material-icons" style={{color: textColor}}>{ direction }</i>
    </a>
  }

  private static _getTextColor(color: string)
  {
    if (color == Color.WHITE)
    {
      return Color.BLACK;
    }
    return Color.WHITE;
  }

  private static _getWavesColor(color: string)
  {
    if (color == Color.WHITE)
    {
      return '';
    }
    return 'waves-light';
  }

  private _clickCallback(): void
  {
    const { clickCallback } = this.props;
    clickCallback();
  }
}
