import * as React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../component/SignupForm";

export const SignupScreen = () => (
  <div>
    <p>Please register.</p>
    <SignupForm onSubmit={() => undefined} />
    <p>
      Already registered? <Link to="/login">Login</Link>
    </p>
  </div>
);
