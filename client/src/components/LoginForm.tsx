import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { LoginDto } from "../model/LoginDto";
import { Button } from "./Button";
import { FormikField } from "./FormikField";
import { Input } from "./Input";

interface Props {
  onSubmit: (values: LoginDto) => void;
}

const initialValues: LoginDto = {
  email: "",
  password: ""
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
});

export const LoginForm = ({ onSubmit }: Props) => (
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
  >
    <Form>
      <FormikField component={Input} type="email" name="email" label="Email" />
      <FormikField
        component={Input}
        type="password"
        name="password"
        label="Password"
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  </Formik>
);
