import * as React from "react";
import "./App.sass";
import DirectionButton, {Color, Direction} from "./direction-button/DirectionButton";

export default class App extends React.Component<{}, {}>
{
  render()
  {
    return <div id={'app'}>
      <span className={'meta-description'}>Once upon a time in a small town...</span>
    </div>;
  }
}
