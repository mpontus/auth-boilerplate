import { ActionType, getType } from "typesafe-actions";
import {
  emailActivationCompleteAction,
  emailActivationRequestAction
} from "../action/emailActivationActions";
import { PasswordRecoveryCompleteDto } from "../model/PasswordRecoveryCompleteDto";
import { PasswordRecoveryRequestDto } from "../model/PasswordRecoveryRequestDto";
import { RequestError } from "../model/RequestError";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";

export const emailActivationRequestReducer = createRequestStateReducer<
  ActionType<
    typeof emailActivationRequestAction | typeof emailActivationCompleteAction
  >,
  RequestError<PasswordRecoveryRequestDto | PasswordRecoveryCompleteDto>
>((state, action) => {
  switch (action.type) {
    case getType(emailActivationRequestAction.request):
    case getType(emailActivationCompleteAction.request):
      return { ...state, loading: true };

    case getType(emailActivationRequestAction.success):
    case getType(emailActivationCompleteAction.success):
      return { ...state, loading: false, success: true };

    case getType(emailActivationRequestAction.failure):
    case getType(emailActivationCompleteAction.failure):
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
});
