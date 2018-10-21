import * as React from "react";
import { Link } from "react-router-dom";
import { LoginContainer } from "../container/LoginContainer";

export const LoginScreen = () => (
  <div>
    <p>Please login</p>
    <LoginContainer />
    <p>
      Don't have an account? <Link to="/signup">Sign up.</Link>
    </p>
  </div>
);
