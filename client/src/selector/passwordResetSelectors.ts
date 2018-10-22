import { Selector } from "reselect";
import { State } from "../reducer";

/**
 * Describes whether passwordReset request is in progress
 */
export const makeIsPasswordResetRequestLoading = (): Selector<
  State,
  boolean
> => state => state.passwordResetRequest.loading;

/**
 * Describes whether passwordReset request has finished successfuly
 */
export const makeIsPasswordResetRequestSuccess = (): Selector<
  State,
  boolean
> => state => state.passwordResetRequest.success;

/**
 * Describes error that occured during passwordReset request
 */
export const makeGetPasswordResetRequestError = (): Selector<
  State,
  Error | undefined
> => state => state.passwordResetRequest.error;
