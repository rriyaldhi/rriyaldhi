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
  color: any
}

export default class DirectionButton extends React.Component<Prop, {}>
{
  render()
  {
    const { direction, color } = this.props;
    const textColor: string = DirectionButton.getTextColor(color);
    const wavesColor: string = DirectionButton.getWavesColor(color);
    return <a className={`button btn-floating waves-effect ${wavesColor} ${color}`}>
      <i className="material-icons" style={{color: textColor}}>{ direction }</i>
    </a>
  }

  private static getTextColor(color: string)
  {
    if (color == Color.WHITE)
    {
      return Color.BLACK;
    }
    return Color.WHITE;
  }

  private static getWavesColor(color: string)
  {
    if (color == Color.WHITE)
    {
      return '';
    }
    return 'waves-light';
  }
}
