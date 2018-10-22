import { ActionType } from "typesafe-actions";
import * as authActions from "./authActions";
import * as emailActivationActions from "./emailActivationActions";
import * as loginActions from "./loginActions";
import * as passwordRecoveryActions from "./passwordRecoveryActions";
import * as profileActions from "./profileActions";
import * as signupActions from "./signupActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<
  | typeof loginActions
  | typeof signupActions
  | typeof authActions
  | typeof passwordRecoveryActions
  | typeof emailActivationActions
  | typeof profileActions
>;
