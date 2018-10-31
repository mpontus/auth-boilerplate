import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import { signupAction } from "../action/signupActions";
import { Button } from "../component/Button";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { Message } from "../component/Message";
import { RequestError } from "../model/RequestError";
import { SignupDto } from "../model/SignupDto";
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

const initialValues: SignupDto = {
  name: "",
  email: "",
  password: ""
};

const schema = yup.object<SignupDto>().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
});

export const SignupContainer = enhance(
  ({ loading, success, error, onSubmit }: Props) => (
    <Form
      errors={error ? error.details : undefined}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <Message error={error} />
      <Field
        component={Input}
        type="text"
        name="name"
        label="Name"
        placeholder="Enter your name"
      />
      <Field
        component={Input}
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email address"
      />
      <Field
        component={Input}
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  )
);
