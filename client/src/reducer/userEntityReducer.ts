import { getType } from "typesafe-actions";
import { Action } from "../action";
import { profileRetrieveAction } from "../action/profileActions";
import { User } from "../model/User";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { updateIn } from "./utils/updateIn";

/**
 * Save user details in the store.
 */
const singleUserEntityReducer = (
  state: User | undefined,
  action: Action
): User | undefined => {
  switch (action.type) {
    case getType(profileRetrieveAction.success):
      return action.payload;

    default:
      return state;
  }
};

/**
 * Save user entities associated by their ID
 */
export const userEntityReducer = createNamespaceReducer<string, User, Action>(
  action => {
    switch (action.type) {
      case getType(profileRetrieveAction.success):
        return updateIn(action.payload.id, singleUserEntityReducer);

      default:
        return state => state;
    }
  }
);
