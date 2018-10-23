import * as React from "react";
import { Route, Switch } from "react-router";
import { Container } from "../component/Container";
import { SingleColumnLayout } from "../component/SingleColumnLayout";
import { NavbarContainer } from "../container/NavbarContainer";
import * as routes from "../routes";
import { EmailActivationScreen } from "../screen/EmailActivationScreen";
import { LoginScreen } from "./LoginScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <Container>
    <NavbarContainer />
    <SingleColumnLayout>
      <Switch>
        <Route path={routes.LOGIN} component={LoginScreen} />
        <Route path={routes.SIGNUP} component={SignupScreen} />
        <Route
          path={routes.EMAIL_ACTIVATION}
          component={EmailActivationScreen}
        />
        <Route
          path={routes.PASSWORD_RECOVERY}
          component={PasswordRecoveryScreen}
        />
        <Route path={routes.PROFILE} component={ProfileScreen} />
      </Switch>
    </SingleColumnLayout>
  </Container>
);
