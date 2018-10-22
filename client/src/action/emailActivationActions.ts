import { createAsyncAction } from "typesafe-actions";
import { EmailActivationCompleteDto } from "../model/EmailActivationCompleteDto";
import { EmailActivationRequestDto } from "../model/EmailActivationRequestDto";
import { RequestError } from "../model/RequestError";

/**
 * Async action set for requesting resend of activation email
 */
export const emailActivationRequestAction = createAsyncAction(
  "EMAIL_ACTIVATION_REQUEST_REQUEST",
  "EMAIL_ACTIVATION_REQUEST_SUCCESS",
  "EMAIL_ACTIVATION_REQUEST_FAILURE"
)<EmailActivationRequestDto, void, RequestError<EmailActivationRequestDto>>();

/**
 * Async action set for activating email
 */
export const emailActivationCompleteAction = createAsyncAction(
  "EMAIL_ACTIVATION_COMPLETE_REQUEST",
  "EMAIL_ACTIVATION_COMPLETE_SUCCESS",
  "EMAIL_ACTIVATION_COMPLETE_FAILURE"
)<EmailActivationCompleteDto, void, RequestError<EmailActivationCompleteDto>>();
