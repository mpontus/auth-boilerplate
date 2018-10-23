import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import {
  passwordRecoveryCompleteAction,
  passwordRecoveryRequestAction
} from "../action/passwordRecoveryActions";
import { Button } from "../component/Button";
import { ErrorMessage } from "../component/ErrorMessage";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { Link } from "../component/Link";
import { Paragraph } from "../component/Paragraph";
import { PasswordRecoveryCompleteDto } from "../model/PasswordRecoveryCompleteDto";
import { PasswordRecoveryRequestDto } from "../model/PasswordRecoveryRequestDto";
import { RequestError } from "../model/RequestError";
import * as routes from "../routes";
import {
  makeGetPasswordRecoveryRequestError,
  makeIsPasswordRecoveryRequestLoading,
  makeIsPasswordRecoveryRequestSuccess
} from "../selector/passwordRecoverySelectors";

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
  error?: RequestError<
    PasswordRecoveryRequestDto & PasswordRecoveryCompleteDto
  >;

  /**
   * Handle password reset request submission
   */
  onSubmitRequest: (values: PasswordRecoveryRequestDto) => void;

  /**
   * Handle password reset confirmation submission
   */
  onSubmitConfirm: (values: PasswordRecoveryCompleteDto) => void;
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
  loading: makeIsPasswordRecoveryRequestLoading(),
  success: makeIsPasswordRecoveryRequestSuccess(),
  error: makeGetPasswordRecoveryRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmitRequest: passwordRecoveryRequestAction.request,
    onSubmitConfirm: passwordRecoveryCompleteAction.request
  }
);

class BasePasswordRecoveryContainer extends React.Component<Props> {
  /**
   * Handle final form submission
   */
  public handleConfirmSubmit = ({ password }: { password: string }) => {
    if (this.props.code !== undefined) {
      this.props.onSubmitConfirm({ password, token: this.props.code });
    }
  };

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
        {this.props.error && (
          <ErrorMessage>{this.props.error.message}</ErrorMessage>
        )}
        <Field
          component={Input}
          type="email"
          name="email"
          placeholder="Enter your email address"
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
        onSubmit={this.handleConfirmSubmit}
      >
        {this.props.error && (
          <ErrorMessage>{this.props.error.message}</ErrorMessage>
        )}
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder="Enter your new password"
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

export const PasswordRecoveryContainer = enhance(BasePasswordRecoveryContainer);
