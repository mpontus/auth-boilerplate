import { ActionType } from "typesafe-actions";
import * as authActions from "./authActions";
import * as loginActions from "./loginActions";
import * as passwordRecoveryActions from "./passwordRecoveryActions";
import * as signupActions from "./signupActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<
  | typeof loginActions
  | typeof signupActions
  | typeof authActions
  | typeof passwordRecoveryActions
>;
