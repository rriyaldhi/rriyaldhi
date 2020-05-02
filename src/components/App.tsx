import * as React from "react";
import "./App.sass";
import DirectionButton, { Direction as ButtonDirection } from "./direction-button/DirectionButton";

export class App extends React.Component<{}, {}>
{
  render()
  {
    return <div id={'app'}>
      <span className={'meta-description'}>Once upon a time in a small town...</span>
      <DirectionButton direction={ButtonDirection.DOWN} />
    </div>;
  }
}
