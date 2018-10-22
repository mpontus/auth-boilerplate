import { ActionType, getType } from "typesafe-actions";
import { signupAction } from "../action/signupActions";
import { RequestError } from "../model/RequestError";
import { SignupDto } from "../model/SignupDto";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";

/**
 * Reducer for signup request state
 */
export const signupRequestReducer = createRequestStateReducer<
  ActionType<typeof signupAction>,
  RequestError<SignupDto>
>((state, action) => {
  switch (action.type) {
    case getType(signupAction.request):
      return { ...state, loading: true };

    case getType(signupAction.success):
      return { ...state, loading: false, success: true };

    case getType(signupAction.failure):
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
});
