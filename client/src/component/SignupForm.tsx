import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { SignupDto } from "../model/SignupDto";
import { Button } from "./Button";
import { FormikField } from "./FormikField";
import { Input } from "./Input";

interface Props {
  onSubmit: (values: SignupDto) => void;
}

const initialValues: SignupDto = {
  name: "",
  email: "",
  password: ""
};

const schema = yup.object().shape({
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

export const SignupForm = ({ onSubmit }: Props) => (
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
  >
    <Form>
      <FormikField component={Input} type="text" name="name" label="Name" />
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
