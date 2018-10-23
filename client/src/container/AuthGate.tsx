import * as React from "react";
import { User } from "../model/User";
import { CurrentUserProvider } from "./CurrentUserProvider";

/**
 * Current auth state as provided by CurrentUserProvider
 */
interface AuthState {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user?: User;
}

/**
 * Possible constraints to match auth state against
 *
 * Multiple constraints follow OR logic because AND logic can be
 * achieved by nesting multiple AuthRoutes.
 */
interface Constraints {
  isAuthenticated?: boolean;
  isAnonymous?: boolean;
  roles?: string[];
}

/**
 * Component props
 */
interface Props extends Constraints {
  /**
   * Render this instead of children if the constraints are not met
   */
  placeholder?: React.ReactNode;
}

/**
 * Decide whether authentication state passes constraints
 */
export const authorize = (
  constraints: Constraints,
  state: AuthState
): boolean => {
  if (
    // We are taking advantage of the fact that state.isAuthenticated
    // and state.isAnonymous can not be undefined.
    constraints.isAuthenticated === state.isAuthenticated ||
    constraints.isAnonymous === state.isAnonymous
  ) {
    return true;
  }

  if (matchRoles(state.user, constraints.roles)) {
    return true;
  }

  return false;
};

/**
 * Match user roles against constraints
 */
export const matchRoles = (
  user: User | undefined,
  roles: string[] | undefined
) => {
  if (user === undefined || roles === undefined) {
    return false;
  }

  return roles.some(role => (user.roles as string[]).includes(role));
};

/**
 * Gate component which renders children when current authentication
 * state matches provided constraints.
 */
export const AuthGate: React.SFC<Props> = props => (
  <CurrentUserProvider>
    {userState =>
      authorize(props, userState) ? (
        <React.Fragment>{props.children}</React.Fragment>
      ) : (
        props.placeholder || null
      )
    }
  </CurrentUserProvider>
);
