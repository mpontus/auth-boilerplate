import { Action, Reducer } from "redux";

type Namespace<K extends string, V> = Partial<Record<K, V>>;

type HigherOrderReducer<S, A extends Action<any>> = (
  action: A
) => (state: S, action: A) => S;

export const createNamespaceReducer = <K extends string, V, A extends Action>(
  fn: HigherOrderReducer<Namespace<K, V>, A>
): Reducer<Namespace<K, V>, A> => (state = {}, action) =>
  fn(action)(state, action);
