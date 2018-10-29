import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import { loginAction } from "../action/loginActions";
import { Button } from "../component/Button";
import { ErrorMessage } from "../component/ErrorMessage";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { LoginDto } from "../model/LoginDto";
import { RequestError } from "../model/RequestError";
import {
  makeGetLoginRequestError,
  makeIsLoginRequestLoading,
  makeIsLoginRequestSuccess
} from "../selector/loginSelectors";

interface Props {
  loading: boolean;
  success: boolean;
  error?: RequestError<LoginDto>;
  onSubmit: (data: LoginDto) => void;
}

const makeMapStateToProps = createStructuredSelector({
  loading: makeIsLoginRequestLoading(),
  success: makeIsLoginRequestSuccess(),
  error: makeGetLoginRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmit: loginAction.request
  }
);

const initialValues = {
  email: "",
  password: ""
};

const schema = yup.object<LoginDto>().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
});

export const LoginContainer = enhance(
  ({ loading, success, error, onSubmit }: Props) => (
    <Form
      errors={error ? error.details : undefined}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
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
        placeholder="Enter your passwort"
      />
      <Button type="submit">Log In</Button>
    </Form>
  )
);
