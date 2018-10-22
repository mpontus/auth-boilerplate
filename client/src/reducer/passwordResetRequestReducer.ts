import { ActionType, getType } from "typesafe-actions";
import {
  passwordResetCompleteAction,
  passwordResetRequestAction
} from "../action/passwordResetActions";
import { PasswordResetCompleteDto } from "../model/PasswordResetCompleteDto";
import { PasswordResetRequestDto } from "../model/PasswordResetRequestDto";
import { RequestError } from "../model/RequestError";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";

export const passwordResetRequestReducer = createRequestStateReducer<
  ActionType<
    typeof passwordResetRequestAction | typeof passwordResetCompleteAction
  >,
  RequestError<PasswordResetRequestDto | PasswordResetCompleteDto>
>((state, action) => {
  switch (action.type) {
    case getType(passwordResetRequestAction.request):
    case getType(passwordResetCompleteAction.request):
      return { ...state, loading: true };

    case getType(passwordResetRequestAction.success):
    case getType(passwordResetCompleteAction.success):
      return { ...state, loading: false, success: true };

    case getType(passwordResetRequestAction.failure):
    case getType(passwordResetCompleteAction.failure):
      return { ...state, error: action.payload };

    default:
      return state;
  }
});
