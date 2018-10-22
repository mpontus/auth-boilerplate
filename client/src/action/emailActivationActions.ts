import { createAsyncAction } from "typesafe-actions";
import { EmailActivationCompleteDto } from "../model/EmailActivationCompleteDto";
import { EmailActivationRequestDto } from "../model/EmailActivationRequestDto";
import { RequestError } from "../model/RequestError";

/**
 * Async action set for requesting resend of activation email
 */
export const emailActivationRequestAction = createAsyncAction(
  "PASSWORD_RESET_REQUEST_REQUEST",
  "PASSWORD_RESET_REQUEST_SUCCESS",
  "PASSWORD_RESET_REQUEST_FAILURE"
)<EmailActivationRequestDto, void, RequestError<EmailActivationRequestDto>>();

/**
 * Async action set for activating email
 */
export const emailActivationCompleteAction = createAsyncAction(
  "PASSWORD_RESET_COMPLETE_REQUEST",
  "PASSWORD_RESET_COMPLETE_SUCCESS",
  "PASSWORD_RESET_COMPLETE_FAILURE"
)<EmailActivationCompleteDto, void, RequestError<EmailActivationCompleteDto>>();
