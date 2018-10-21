import { ActionType } from "typesafe-actions";
import * as loginActions from "./loginActions";
import * as signupActions from "./signupActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<typeof loginActions | typeof signupActions>;
