import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        HOME PAGE
        <hr/>
        <br/>
        <div>Count: {this.props.count}</div>
        <br/>
        <button onClick={() => this.props.dispatch({type: 'INCREMENT'})}>Increment</button>
        <br/>
        <button onClick={() => this.props.dispatch({type: 'DECREMENT'})}>Decrement</button>
      </div>
    );
  }
}

export default connect(state => state)(Home);