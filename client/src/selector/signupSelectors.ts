import { Selector } from "reselect";
import { State } from "../reducer";

/**
 * Describes whether signup request is in progress
 */
export const makeIsSignupRequestLoading = (): Selector<
  State,
  boolean
> => state => state.signupRequest.loading;

/**
 * Describes whether signup request has finished successfuly
 */
export const makeIsSignupRequestSuccess = (): Selector<
  State,
  boolean
> => state => state.signupRequest.success;

/**
 * Describes error that occured during signup request
 */
export const makeGetSignupRequestError = (): Selector<
  State,
  Error | undefined
> => state => state.signupRequest.error;
