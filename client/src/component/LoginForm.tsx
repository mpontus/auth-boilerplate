import * as React from "react";
import * as yup from "yup";
import { LoginDto } from "../model/LoginDto";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";

interface Props {
  errors?: { [P in keyof LoginDto]?: string };
  onSubmit: (values: LoginDto) => void;
}

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

export const LoginForm = ({ errors, onSubmit }: Props) => {
  return (
    <Form<LoginDto>
      errors={errors}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
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
  );
};
