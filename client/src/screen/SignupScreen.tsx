import * as React from "react";
import { Link } from "react-router-dom";
import { SignupContainer } from "../container/SignupContainer";

export const SignupScreen = () => (
  <div>
    <p>Please register.</p>
    <SignupContainer />
    <p>
      Already registered? <Link to="/login">Login</Link>
    </p>
  </div>
);
