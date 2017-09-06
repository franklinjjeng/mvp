import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import App from './components/app.jsx';
// import store from './store.jsx';
import Home from './components/home.jsx';
import NoPage404 from './components/noPage404.jsx';
import Test from './components/test.jsx';

function createElement(Component, props) {
  return <Component key={`RouteComponent-${props.location.pathname}`} {...props} />;
}


export class Tactictoe extends React.Component {

  render() {
    return (
      <Router history={browserHistory} createElement={createElement} onUpdate={() => window.scrollTo(0, 0)}>
        <Route component={App}>
          <Route path="/" component={Home}/>
          <Route path="/test" component={Test}/>
          <Route path="404" component={NoPage404}/>
          <Redirect from="*" to='404' />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Tactictoe />, document.getElementById('app'));
