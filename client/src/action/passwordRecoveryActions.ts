import { createAsyncAction } from "typesafe-actions";
import { PasswordRecoveryCompleteDto } from "../model/PasswordRecoveryCompleteDto";
import { PasswordRecoveryRequestDto } from "../model/PasswordRecoveryRequestDto";
import { RequestError } from "../model/RequestError";

/**
 * Async action set for requesting password reset
 */
export const passwordRecoveryRequestAction = createAsyncAction(
  "PASSWORD_RESET_REQUEST_REQUEST",
  "PASSWORD_RESET_REQUEST_SUCCESS",
  "PASSWORD_RESET_REQUEST_FAILURE"
)<PasswordRecoveryRequestDto, void, RequestError<PasswordRecoveryRequestDto>>();

/**
 * Async action set for completing password reset
 */
export const passwordRecoveryCompleteAction = createAsyncAction(
  "PASSWORD_RESET_COMPLETE_REQUEST",
  "PASSWORD_RESET_COMPLETE_SUCCESS",
  "PASSWORD_RESET_COMPLETE_FAILURE"
)<PasswordRecoveryCompleteDto, void, RequestError<PasswordRecoveryCompleteDto>>();
