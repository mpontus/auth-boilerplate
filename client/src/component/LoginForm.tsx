import * as React from "react";
import * as yup from "yup";
import { LoginDto } from "../model/LoginDto";
import { Button } from "./Button";
import { FormikField } from "./FormikField";
import { FormikForm } from "./FormikForm";
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
    <FormikForm<LoginDto>
      errors={errors}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <FormikField component={Input} type="email" name="email" label="Email" />
      <FormikField
        component={Input}
        type="password"
        name="password"
        label="Password"
      />
      <Button type="submit">Sign Up</Button>
    </FormikForm>
  );
};
