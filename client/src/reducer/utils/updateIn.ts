import { Action, Reducer } from "redux";

/**
 * Return a function which updates given key in an object, using the
 * provided updater function.
 */
export const updateIn = <
  K extends keyof R,
  A extends Action,
  V,
  R = Record<K, V>
>(
  key: K,
  updater: Reducer<R[K], A>
) => (state: R, action: A): R =>
  Object.assign({}, state, { [key]: updater(state[key], action) });
