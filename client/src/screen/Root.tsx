import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "../component/Container";
import { Footer } from "../component/Footer";
import { SingleColumnLayout } from "../component/SingleColumnLayout";
import { AuthGate } from "../container/AuthGate";
import { NavbarContainer } from "../container/NavbarContainer";
import * as routes from "../routes";
import { EmailActivationScreen } from "../screen/EmailActivationScreen";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SignupScreen } from "./SignupScreen";

/**
 * Redirect to the front page when current route is inaccessible
 */
const redirectToFront = <Redirect to={routes.HOME} />;

/**
 * Root screen
 *
 * Contains top-level routes of the website.
 */
export const Root = () => (
  <AuthGate isAuthenticated={true}>
    <Container>
      <NavbarContainer />
      <SingleColumnLayout>
        <Switch>
          <Route exact={true} path={routes.HOME} component={MainScreen} />
          <Route path={routes.LOGIN}>
            <AuthGate placeholder={redirectToFront} isAnonymous={true}>
              <LoginScreen />
            </AuthGate>
          </Route>
          <Route path={routes.SIGNUP}>
            <AuthGate placeholder={redirectToFront} isAnonymous={true}>
              <SignupScreen />
            </AuthGate>
          </Route>
          <Route
            path={routes.EMAIL_ACTIVATION}
            component={EmailActivationScreen}
          />
          <Route
            path={routes.PASSWORD_RECOVERY}
            component={PasswordRecoveryScreen}
          />
          <Route path={routes.PROFILE}>
            <AuthGate placeholder={redirectToFront} isAnonymous={false}>
              <ProfileScreen />
            </AuthGate>
          </Route>
          {redirectToFront}
        </Switch>
      </SingleColumnLayout>
      <Footer />
    </Container>
  </AuthGate>
);
