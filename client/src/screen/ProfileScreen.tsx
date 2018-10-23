import * as React from "react";
import { ProfileContainer } from "../container/ProfileContainer";
import { Heading } from "../component/Heading";

export const ProfileScreen = () => (
  <React.Fragment>
    <Heading>Your Profile</Heading>
    <ProfileContainer section="personal" />
    <ProfileContainer section="email" />
    <ProfileContainer section="password" />
  </React.Fragment>
);
