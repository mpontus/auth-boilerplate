import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { signupAction } from "../action/signupActions";
import { FormError } from "../component/FormError";
import { SignupForm } from "../component/SignupForm";
import { SignupDto } from "../model/SignupDto";
import { RequestError } from "../model/RequestError";
import {
  makeGetSignupRequestError,
  makeIsSignupRequestLoading,
  makeIsSignupRequestSuccess
} from "../selector/signupSelectors";

interface Props {
  loading: boolean;
  success: boolean;
  error?: RequestError<SignupDto>;
  onSubmit: (data: SignupDto) => void;
}

const makeMapStateToProps = createStructuredSelector({
  loading: makeIsSignupRequestLoading(),
  success: makeIsSignupRequestSuccess(),
  error: makeGetSignupRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmit: signupAction.request
  }
);

export const SignupContainer = enhance(
  ({ loading, success, error, onSubmit }: Props) => (
    <React.Fragment>
      {error && <FormError>{error.message}</FormError>}
      <SignupForm errors={error && error.details} onSubmit={onSubmit} />
    </React.Fragment>
  )
);
