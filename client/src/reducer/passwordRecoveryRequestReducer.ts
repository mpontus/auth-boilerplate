import { ActionType, getType } from "typesafe-actions";
import {
  passwordRecoveryCompleteAction,
  passwordRecoveryRequestAction
} from "../action/passwordRecoveryActions";
import { PasswordRecoveryCompleteDto } from "../model/PasswordRecoveryCompleteDto";
import { PasswordRecoveryRequestDto } from "../model/PasswordRecoveryRequestDto";
import { RequestError } from "../model/RequestError";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";

export const passwordRecoveryRequestReducer = createRequestStateReducer<
  ActionType<
    typeof passwordRecoveryRequestAction | typeof passwordRecoveryCompleteAction
  >,
  RequestError<PasswordRecoveryRequestDto | PasswordRecoveryCompleteDto>
>((state, action) => {
  switch (action.type) {
    case getType(passwordRecoveryRequestAction.request):
    case getType(passwordRecoveryCompleteAction.request):
      return { ...state, loading: true };

    case getType(passwordRecoveryRequestAction.success):
    case getType(passwordRecoveryCompleteAction.success):
      return { ...state, loading: false, success: true };

    case getType(passwordRecoveryRequestAction.failure):
    case getType(passwordRecoveryCompleteAction.failure):
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
});
