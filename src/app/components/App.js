import React from 'react';

// Components
import Navbar from './navigation/Navbar.js';
import Main from './Main.js';



export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" props={this.props} />
        <Main />
      </div>
    );
  }
}




