import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "../action/loginActions";
import { FormError } from "../component/FormError";
import { LoginForm } from "../component/LoginForm";
import { LoginDto } from "../model/LoginDto";
import {
  makeGetLoginRequestError,
  makeIsLoginRequestLoading,
  makeIsLoginRequestSuccess
} from "../selector/loginSelectors";

interface Props {
  loading: boolean;
  success: boolean;
  error?: Error;
  onSubmit: (data: LoginDto) => void;
}

const makeMapStateToProps = createStructuredSelector({
  loading: makeIsLoginRequestLoading(),
  success: makeIsLoginRequestSuccess(),
  error: makeGetLoginRequestError()
});

const enhance = connect(makeMapStateToProps, {
  onSubmit: login.request
});

export const LoginContainer = enhance(
  ({ loading, success, error, onSubmit }: Props) => (
    <React.Fragment>
      {error && <FormError>{error.message}</FormError>}
      <LoginForm onSubmit={onSubmit} />
    </React.Fragment>
  )
);
