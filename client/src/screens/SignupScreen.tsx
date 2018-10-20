import * as React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/SignupForm";

export const SignupScreen = () => (
  <div>
    <p>Please register.</p>
    <SignupForm onSubmit={console.log} />
    <p>
      Already registered? <Link to="/login">Login</Link>
    </p>
  </div>
);
