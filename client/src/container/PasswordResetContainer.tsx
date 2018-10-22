import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import {
  passwordResetCompleteAction,
  passwordResetRequestAction
} from "../action/passwordResetActions";
import { Button } from "../component/Button";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { Link } from "../component/Link";
import { Paragraph } from "../component/Paragraph";
import { PasswordResetCompleteDto } from "../model/PasswordResetCompleteDto";
import { PasswordResetRequestDto } from "../model/PasswordResetRequestDto";
import { RequestError } from "../model/RequestError";
import * as routes from "../routes";
import {
  makeGetPasswordResetRequestError,
  makeIsPasswordResetRequestLoading,
  makeIsPasswordResetRequestSuccess
} from "../selector/passwordResetSelectors";

interface Props {
  /**
   * Confirmation code
   */
  code?: string;

  /**
   * Whether the request is in progress
   */
  loading: boolean;

  /**
   * Whether the request has finished successfuly
   */
  success: boolean;

  /**
   * Request error
   */
  error?: RequestError<PasswordResetRequestDto & PasswordResetCompleteDto>;

  /**
   * Handle password reset request submission
   */
  onSubmitRequest: (values: PasswordResetRequestDto) => void;

  /**
   * Handle password reset confirmation submission
   */
  onSubmitConfirm: (values: PasswordResetCompleteDto) => void;
}

/**
 * Validation schema for password recovery request form
 */
const requestSchema = yup.object<{ email: string }>().shape({
  email: yup
    .string()
    .email()
    .required()
});

/**
 * Validation schema for password reset confirmation form
 */
const confirmSchema = yup.object<{ password: string }>().shape({
  password: yup
    .string()
    .min(6)
    .required()
});

const makeMapStateToProps = createStructuredSelector({
  loading: makeIsPasswordResetRequestLoading(),
  success: makeIsPasswordResetRequestSuccess(),
  error: makeGetPasswordResetRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmitRequest: passwordResetRequestAction.request,
    onSubmitConfirm: passwordResetCompleteAction.request
  }
);

class BasePasswordResetContainer extends React.Component<Props> {
  /**
   * Render a form for requesting password reset code
   */
  public renderRequestForm() {
    return !this.props.success ? (
      <Form
        initialValues={{ email: "" }}
        validationSchema={requestSchema}
        errors={this.props.error ? this.props.error.details : undefined}
        onSubmit={this.props.onSubmitRequest}
      >
        <Field
          component={Input}
          type="email"
          name="email"
          label="Please enter your email address"
        />
        <Button type="submit" loading={this.props.loading}>
          Send password reset email
        </Button>
      </Form>
    ) : (
      <Paragraph>
        We sent password recovery instructions to your email address.
      </Paragraph>
    );
  }

  /**
   * Render a form for completing password reset after following email link
   */
  public renderConfirmationForm() {
    return !this.props.success ? (
      <Form
        initialValues={{ password: "" }}
        validationSchema={confirmSchema}
        errors={this.props.error ? this.props.error.details : undefined}
        onSubmit={this.props.onSubmitConfirm}
      >
        <Field
          component={Input}
          type="password"
          name="password"
          label="New Password"
        />
        <Button type="submit" loading={this.props.loading}>
          Change password
        </Button>
      </Form>
    ) : (
      <Paragraph>
        Password has been reset. You can <Link to={routes.LOGIN}>log in</Link>{" "}
        now.
      </Paragraph>
    );
  }

  public render() {
    return !this.props.code
      ? this.renderRequestForm()
      : this.renderConfirmationForm();
  }
}

export const PasswordResetContainer = enhance(BasePasswordResetContainer);
