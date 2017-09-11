// This is the reducer that aggregates all other reducers
import { combineReducers } from 'redux';

import gameReducer from './gameReducer.js';

// console.log('greducer', gameReducer);

const counterApp = combineReducers({
  gameReducer
})

export default counterApp