import { Selector } from "reselect";
import { State } from "../reducer";

/**
 * Describes whether login request is in progress
 */
export const makeIsLoginRequestLoading = (): Selector<
  State,
  boolean
> => state => state.loginRequest.loading;

/**
 * Describes whether login request has finished successfuly
 */
export const makeIsLoginRequestSuccess = (): Selector<
  State,
  boolean
> => state => state.loginRequest.success;

/**
 * Describes error that occured during login request
 */
export const makeGetLoginRequestError = (): Selector<
  State,
  Error | undefined
> => state => state.loginRequest.error;
