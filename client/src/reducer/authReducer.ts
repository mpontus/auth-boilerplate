import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../action";
import { authStatusChangeAction } from "../action/authActions";
import { User } from "../model/User";

interface State {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user?: User;
}

const initialState: State = {
  isAuthenticated: false,
  isAnonymous: false,
  user: undefined
};

/**
 * Describes user session.
 *
 * We are working off the assumption that authStatusChange will be
 * dispatched exactly once between pagee reloads.
 *
 * When the user logs in and out it can make the previously stored
 * information, returned by backend, obsolete and having the state
 * reset with window.reload() greatly simplifies things.
 */
export const authReducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case getType(authStatusChangeAction):
      return {
        isAuthenticated: true,
        isAnonymous: action.payload === undefined,
        user: action.payload
      };

    default:
      return state;
  }
};
