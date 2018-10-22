import { getType, StateType } from "typesafe-actions";
import { Action } from "../action";
import { profileUpdateAction } from "../action/profileActions";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";
import { updateIn } from "./utils/updateIn";

/**
 * Subreducer which updates request state for a single user
 */
const singleUserUpdateRequestReducer = createRequestStateReducer<
  Action,
  RequestError<ProfileUpdateDto>
>((state, action) => {
  switch (action.type) {
    case getType(profileUpdateAction.request):
      return {
        ...state,
        loading: true
      };

    case getType(profileUpdateAction.success):
      return {
        ...state,
        loading: false,
        success: true
      };

    case getType(profileUpdateAction.failure):
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
export const userUpdateRequestReducer = createNamespaceReducer<
  User["id"],
  StateType<typeof singleUserUpdateRequestReducer>,
  Action
>(action => {
  switch (action.type) {
    case getType(profileUpdateAction.request):
    case getType(profileUpdateAction.failure):
      return updateIn(action.payload.user.id, singleUserUpdateRequestReducer);

    case getType(profileUpdateAction.success):
      return updateIn(action.payload.id, singleUserUpdateRequestReducer);

    default:
      return state => state;
  }
});
