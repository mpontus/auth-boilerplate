import { Selector } from "reselect";
import { State } from "../reducer";

/**
 * Describes whether emailActivation request is in progress
 */
export const makeIsEmailActivationRequestLoading = (): Selector<
  State,
  boolean
> => state => state.emailActivationRequest.loading;

/**
 * Describes whether emailActivation request has finished successfuly
 */
export const makeIsEmailActivationRequestSuccess = (): Selector<
  State,
  boolean
> => state => state.emailActivationRequest.success;

/**
 * Describes error that occured during emailActivation request
 */
export const makeGetEmailActivationRequestError = (): Selector<
  State,
  Error | undefined
> => state => state.emailActivationRequest.error;
