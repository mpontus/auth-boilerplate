import * as React from "react";
import { ProfileContainer } from "../container/ProfileContainer";

export const ProfileScreen = () => (
  <div>
    <ProfileContainer section="personal" />
    <ProfileContainer section="email" />
    <ProfileContainer section="password" />
  </div>
);
