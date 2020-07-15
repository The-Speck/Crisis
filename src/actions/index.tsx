import { Action, Dispatch } from 'redux';

export * from './auth';
export * from './news';
export type DispatchableAction<T extends Action, P = false> = (
  dispatch: Dispatch<T>,
) => P extends true ? Promise<T> : T;
