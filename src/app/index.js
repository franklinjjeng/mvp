import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App.js'
import store from './store.js';

export default class Client extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Client/>, document.getElementById('app'));




