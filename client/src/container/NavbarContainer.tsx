import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { createStructuredSelector } from "reselect";
import { logoutAction } from "../action/authActions";
import { Button } from "../component/Button";
import { User } from "../model/User";
import * as routes from "../routes";
import {
  makeGetCurrentUser,
  makeIsUserAnonymous,
  makeIsUserAuthenticated
} from "../selector/authSelectors";

interface Props {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user: User;
  onLogout: () => void;
}

const makeMapStateToProps = createStructuredSelector({
  isAuthenticated: makeIsUserAuthenticated(),
  isAnonymous: makeIsUserAnonymous(),
  user: makeGetCurrentUser()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onLogout: logoutAction.request
  }
);

export const NavbarContainer = enhance(
  ({ isAuthenticated, isAnonymous, user, onLogout }: Props) => (
    <Route>
      {({ history }) => (
        <div>
          {!isAuthenticated || isAnonymous ? (
            <div>
              <Button link={routes.LOGIN}>Log in</Button>
            </div>
          ) : (
            <div>
              <span>{user.name}</span>
              <Button link={routes.PROFILE}>Profile</Button>
              <Button onClick={onLogout}>Logout</Button>
            </div>
          )}
        </div>
      )}
    </Route>
  )
);
