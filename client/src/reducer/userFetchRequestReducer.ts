import { getType, StateType } from "typesafe-actions";
import { Action } from "../action";
import { profileRetrieveAction } from "../action/profileActions";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";
import { updateIn } from "./utils/updateIn";

/**
 * Subreducer which updates request state for a single user
 */
const singleUserFetchRequestReducer = createRequestStateReducer<
  Action,
  RequestError<void>
>((state, action) => {
  switch (action.type) {
    case getType(profileRetrieveAction.request):
      return {
        ...state,
        loading: true
      };

    case getType(profileRetrieveAction.success):
      return {
        ...state,
        loading: false,
        success: true
      };

    case getType(profileRetrieveAction.failure):
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
});

/**
 * Namespaced reduer which maintains a map of request states
 * associated with users by their id.
 */
export const userFetchRequestReducer = createNamespaceReducer<
  User["id"],
  StateType<typeof singleUserFetchRequestReducer>,
  Action
>(action => {
  switch (action.type) {
    case getType(profileRetrieveAction.request):
    case getType(profileRetrieveAction.success):
      return updateIn(action.payload.id, singleUserFetchRequestReducer);

    case getType(profileRetrieveAction.failure):
      return updateIn(action.payload.user.id, singleUserFetchRequestReducer);

    default:
      return state => state;
  }
});
