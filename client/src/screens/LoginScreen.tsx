import * as React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const LoginScreen = () => (
  <div>
    <p>Please login</p>
    <LoginForm onSubmit={console.log} />
    <p>
      Don't have an account? <Link to="/signup">Sign up.</Link>
    </p>
  </div>
);
