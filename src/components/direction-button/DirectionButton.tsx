import * as React from "react";
import './DirectionButton.sass'

export const Direction: any =
{
  DOWN: 'keyboard_arrow_down'
};

interface Prop
{
  direction: any,
}

export default class DirectionButton extends React.Component<Prop, {}>
{
  render()
  {
    const { direction } = this.props;
    return <a className={'button btn-floating waves-effect white'}>
      <i className="material-icons">{ direction }</i>
    </a>
  }
}
