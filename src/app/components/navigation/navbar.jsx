import React from 'react';
import { Link } from 'react-router';

// Components

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.updatePath = this.updatePath.bind(this);
  }

  updatePath(e) {
    e.preventDefault();
    const url = e.target.name;
    this.props.props.router.push(url);
  }
  
  render() {
    const pathname = this.props.props.location.pathname;
    return (
      <div className="navbar">
        <div className="navbar_button">
          <a onClick={this.updatePath} name="/">FJeng</a>
        </div>
        <div className="navbar_button">
          <a onClick={this.updatePath} name="/test">Test</a>
        </div>
      </div>
    );
  }
}