import * as React from "react";
import { Route, Switch } from "react-router";
import { EmailActivationContainer } from "../container/EmailActivationContainer";
import { NavbarContainer } from "../container/NavbarContainer";
import { PasswordResetContainer } from "../container/PasswordResetContainer";
import * as routes from "../routes";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <React.Fragment>
    <NavbarContainer />
    <Switch>
      <Route path={routes.LOGIN} component={LoginScreen} />
      <Route path={routes.SIGNUP} component={SignupScreen} />
      <Route
        path={routes.EMAIL_ACTIVATION}
        component={EmailActivationContainer}
      />
      <Route
        path={routes.PASSWORD_RECOVERY}
        component={PasswordResetContainer}
      />
    </Switch>
  </React.Fragment>
);
