import * as React from "react";
import { Link } from "react-router-dom";
import { DocumentTitle } from "src/component/DocumentTitle";
import { Heading } from "../component/Heading";
import { Paragraph } from "../component/Paragraph";
import { Section } from "../component/Section";
import { SignupContainer } from "../container/SignupContainer";

export const SignupScreen = () => (
  <DocumentTitle title="Sign Up">
    <Section>
      <Heading>Create new account</Heading>
      <SignupContainer />
    </Section>
    <Section>
      <Paragraph>
        Already have an account? <Link to="/login">Login »</Link>
      </Paragraph>
    </Section>
  </DocumentTitle>
);
