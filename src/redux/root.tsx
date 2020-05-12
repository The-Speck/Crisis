import { combineReducers } from 'redux';
import { news } from './reducers';

const rootReducer = combineReducers({ news });

export default rootReducer;
