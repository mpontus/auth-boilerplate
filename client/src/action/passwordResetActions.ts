import { createAsyncAction } from "typesafe-actions";
import { PasswordResetCompleteDto } from "../model/PasswordResetCompleteDto";
import { PasswordResetRequestDto } from "../model/PasswordResetRequestDto";
import { RequestError } from "../model/RequestError";

/**
 * Async action set for requesting password reset
 */
export const passwordResetRequestAction = createAsyncAction(
  "PASSWORD_RESET_REQUEST_REQUEST",
  "PASSWORD_RESET_REQUEST_SUCCESS",
  "PASSWORD_RESET_REQUEST_FAILURE"
)<PasswordResetRequestDto, void, RequestError<PasswordResetRequestDto>>();

/**
 * Async action set for completing password reset
 */
export const passwordResetCompleteAction = createAsyncAction(
  "PASSWORD_RESET_COMPLETE_REQUEST",
  "PASSWORD_RESET_COMPLETE_SUCCESS",
  "PASSWORD_RESET_COMPLETE_FAILURE"
)<PasswordResetCompleteDto, void, RequestError<PasswordResetCompleteDto>>();
