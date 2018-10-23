import * as React from "react";
import { Heading } from "../component/Heading";
import { ProfileContainer } from "../container/ProfileContainer";

export const ProfileScreen = () => (
  <React.Fragment>
    <Heading>Your Profile</Heading>
    <ProfileContainer section="personal" />
    <ProfileContainer section="email" />
    <ProfileContainer section="password" />
  </React.Fragment>
);
