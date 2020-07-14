import { combineReducers } from 'redux';
import * as root from './reducers';

const rootReducer = combineReducers(root);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
