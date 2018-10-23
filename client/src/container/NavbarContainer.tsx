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
import { Navbar } from "../component/Navbar";

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
    <Navbar>
      {!isAuthenticated || isAnonymous ? (
        <React.Fragment>
          <Button link={routes.LOGIN}>Log in</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>{user.name}</span>
          <Button link={routes.PROFILE}>Profile</Button>
          <Button onClick={onLogout}>Logout</Button>
        </React.Fragment>
      )}
    </Navbar>
  )
);
