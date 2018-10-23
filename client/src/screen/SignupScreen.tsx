import * as React from "react";
import { Link } from "react-router-dom";
import { Heading } from "../component/Heading";
import { Paragraph } from "../component/Paragraph";
import { Section } from "../component/Section";
import { SignupContainer } from "../container/SignupContainer";

export const SignupScreen = () => (
  <React.Fragment>
    <Section>
      <Heading>Create new account</Heading>
      <SignupContainer />
    </Section>
    <Section>
      <Paragraph>
        Already have an account? <Link to="/login">Login »</Link>
      </Paragraph>
    </Section>
  </React.Fragment>
);
