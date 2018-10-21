import { Action, Reducer } from "redux";

interface RequestState<ErrorType> {
  loading: boolean;
  success: boolean;
  error?: ErrorType;
}

const initialState = {
  loading: false,
  success: false
};

/**
 * Reusable reducer constructor for managing request state
 */
export const createRequestStateReducer = <
  ActionType extends Action<any>,
  ErrorType extends Error
>(
  reducer: (
    state: RequestState<ErrorType>,
    action: ActionType
  ) => RequestState<ErrorType>
): Reducer<RequestState<ErrorType>, ActionType> => (
  state = initialState,
  action
) => reducer(state, action);
