import { Selector } from "reselect";
import { State } from "../reducer";

/**
 * Describes whether passwordRecovery request is in progress
 */
export const makeIsPasswordRecoveryRequestLoading = (): Selector<
  State,
  boolean
> => state => state.passwordRecoveryRequest.loading;

/**
 * Describes whether passwordRecovery request has finished successfuly
 */
export const makeIsPasswordRecoveryRequestSuccess = (): Selector<
  State,
  boolean
> => state => state.passwordRecoveryRequest.success;

/**
 * Describes error that occured during passwordRecovery request
 */
export const makeGetPasswordRecoveryRequestError = (): Selector<
  State,
  Error | undefined
> => state => state.passwordRecoveryRequest.error;
