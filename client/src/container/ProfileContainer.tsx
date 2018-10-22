import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import {
  profileRetrieveAction,
  profileUpdateAction
} from "../action/profileActions";
import { Button } from "../component/Button";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { Loading } from "../component/Loading";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";
import { makeGetCurrentUser } from "../selector/authSelectors";
import {
  makeGetProfile,
  makeGetProfileError,
  makeIsProfileLoading,
  makeIsProfileSaving
} from "../selector/profileSelectors";

interface Props {
  section: "personal" | "email" | "password";
  user?: User;
  profile?: User;
  loading: boolean;
  saving: boolean;
  error?: RequestError<ProfileUpdateDto>;
  onShown: () => void;
  onSubmit: (values: ProfileUpdateDto) => void;
}

const personalFormSchema = yup
  .object<{
    name: string;
  }>()
  .shape({
    name: yup.string().required()
  });

const emailFormSchema = yup
  .object<{
    email: string;
    currentPassword: string;
  }>()
  .shape({
    email: yup
      .string()
      .email()
      .required(),
    currentPassword: yup.string().min(6)
  });

const passwordFormSchema = yup
  .object<{
    password: string;
    passwordConfirm: string;
    currentPassword: string;
  }>()
  .shape({
    password: yup.string().min(6),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
    currentPassword: yup.string().min(6)
  });

const makeMapStateToProps = createStructuredSelector({
  user: makeGetCurrentUser(),
  profile: makeGetProfile(),
  loading: makeIsProfileLoading(),
  saving: makeIsProfileSaving(),
  error: makeGetProfileError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmit: profileUpdateAction.request,
    onShown: profileRetrieveAction.request
  },
  (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, stateProps, ownProps, {
      onSubmit: (payload: ProfileUpdateDto) =>
        stateProps.user &&
        dispatchProps.onSubmit({ user: stateProps.user, update: payload }),

      onShown: () => stateProps.user && dispatchProps.onShown(stateProps.user)
    })
);

class BaseProfileContainer extends React.Component<Props> {
  public renderPersonalForm() {
    if (this.props.profile === undefined) {
      return <Loading />;
    }

    const { name } = this.props.profile;

    return (
      <Form
        initialValues={{ name }}
        validationSchema={personalFormSchema}
        onSubmit={this.props.onSubmit}
      >
        <Field component={Input} type="text" label="Display Name" name="name" />
        <Button type="submit">Save</Button>
      </Form>
    );
  }

  public renderEmailForm() {
    if (this.props.profile === undefined) {
      return <Loading />;
    }

    const { email } = this.props.profile;

    return (
      <Form
        initialValues={{ email }}
        validationSchema={emailFormSchema}
        onSubmit={this.props.onSubmit}
      >
        <Field
          component={Input}
          type="text"
          label="Email Address"
          name="email"
        />
        <Field
          component={Input}
          type="password"
          label="Current Password"
          name="currentPassword"
        />
        <Button type="submit">Save</Button>
      </Form>
    );
  }

  public renderPasswordForm() {
    if (this.props.profile === undefined) {
      return <Loading />;
    }

    return (
      <Form
        initialValues={{
          password: "",
          passwordConfirm: "",
          currentPassword: ""
        }}
        validationSchema={passwordFormSchema}
        onSubmit={({ password, currentPassword }) =>
          this.props.onSubmit({ password, currentPassword })
        }
      >
        <Field
          component={Input}
          type="text"
          label="New Password"
          name="password"
        />
        <Field
          component={Input}
          type="text"
          label="Repeat Password"
          name="passwordConfirm"
        />
        <Field
          component={Input}
          type="password"
          label="Current Password"
          name="currentPassword"
        />
        <Button type="submit">Save</Button>
      </Form>
    );
  }

  public componentDidMount() {
    this.props.onShown();
  }

  public render() {
    switch (this.props.section) {
      case "personal":
        return this.renderPersonalForm();

      case "email":
        return this.renderEmailForm();

      case "password":
        return this.renderPasswordForm();

      default:
        return null;
    }
  }
}

export const ProfileContainer = enhance(BaseProfileContainer);
