import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// import index from './reducers/combinedReducers.js';
import reducer from './reducers/gameReducer.js';

// console.log('index', index);
console.log('reducer', reducer);

// var middleware = applyMiddleware(promise(), thunk, logger());
var middleware = applyMiddleware(promise(), thunk);

export default createStore(reducer, middleware);