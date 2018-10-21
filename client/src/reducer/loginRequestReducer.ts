import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../action";
import { login } from "../action/loginActions";

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
    case getType(login.request): {
      return {
        ...state,
        loading: true
      };
    }

    case getType(login.success): {
      return {
        ...state,
        loading: false,
        success: true
      };
    }

    case getType(login.failure): {
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
