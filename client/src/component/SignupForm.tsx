import * as React from "react";
import * as yup from "yup";
import { SignupDto } from "../model/SignupDto";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";

interface Props {
  errors?: { [P in keyof SignupDto]?: string };
  onSubmit: (values: SignupDto) => void;
}

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

export const SignupForm = ({ errors, onSubmit }: Props) => (
  <Form
    errors={errors}
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
  >
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
);
