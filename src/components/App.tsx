import * as React from "react";
import "./style.sass";

export class App extends React.Component<{}, {}>
{
  render()
  {
    return <div id={'app'}>
      <span style={{display: 'none'}}>Once upon a time in a small town...</span>
    </div>;
  }
}
