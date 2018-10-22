import { ActionType, getType } from "typesafe-actions";
import { loginAction } from "../action/loginActions";
import { LoginDto } from "../model/LoginDto";
import { RequestError } from "../model/RequestError";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";

/**
 * Reducer for login request state
 */
export const loginRequestReducer = createRequestStateReducer<
  ActionType<typeof loginAction>,
  RequestError<LoginDto>
>((state, action) => {
  switch (action.type) {
    case getType(loginAction.request):
      return { ...state, loading: true };

    case getType(loginAction.success):
      return { ...state, loading: false, success: true };

    case getType(loginAction.failure):
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
});
