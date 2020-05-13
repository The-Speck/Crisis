import { combineReducers } from 'redux';
import { news } from './reducers';

const rootReducer = combineReducers({ news });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
