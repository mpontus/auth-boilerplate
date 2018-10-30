import * as React from "react";
import { Link } from "react-router-dom";
import { DocumentTitle } from "src/component/DocumentTitle";
import { Heading } from "../component/Heading";
import { Paragraph } from "../component/Paragraph";
import { Section } from "../component/Section";
import { LoginContainer } from "../container/LoginContainer";

export const LoginScreen = () => (
  <DocumentTitle title="Log In">
    <Section>
      <Heading>Log in with existing account</Heading>
      <LoginContainer />
    </Section>
    <Section>
      <Paragraph>
        Can't login?{" "}
        <Link to="/password_recovery">Recover your password »</Link>
      </Paragraph>
      <Paragraph>
        Don't have an account? <Link to="/signup">Sign up »</Link>
      </Paragraph>
      <Paragraph>
        <Link to="/email_activation">Resend activation email »</Link>
      </Paragraph>
    </Section>
  </DocumentTitle>
);
