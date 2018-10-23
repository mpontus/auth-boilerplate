import * as React from "react";
import { Heading } from "../component/Heading";
import { Section } from "../component/Section";
import { ProfileContainer } from "../container/ProfileContainer";

export const ProfileScreen = () => (
  <React.Fragment>
    <Section>
      <Heading>Your Profile</Heading>
      <ProfileContainer section="personal" />
    </Section>
    <Section>
      <Heading is="h4">Change Email Address</Heading>
      <ProfileContainer section="email" />
    </Section>
    <Section>
      <Heading is="h4">Change Password</Heading>
      <ProfileContainer section="password" />
    </Section>
  </React.Fragment>
);
