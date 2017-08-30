import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h1>Hello WORLD!</h1>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));