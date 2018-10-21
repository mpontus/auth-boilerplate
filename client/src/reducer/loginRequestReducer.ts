import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../action";
import { loginAction } from "../action/loginActions";

/**
 * Describes the state of login request
 */
interface State {
  /**
   * Request in progress
   */
  loading: boolean;

  /**
   * Request has finished successfuly
   */
  success: boolean;

  /**
   * Request error
   */
  error?: Error;
}

const initialState = {
  loading: false,
  success: false,
  error: undefined
};

export const loginRequestReducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(loginAction.request): {
      return {
        ...state,
        loading: true
      };
    }

    case getType(loginAction.success): {
      return {
        ...state,
        loading: false,
        success: true
      };
    }

    case getType(loginAction.failure): {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
};
