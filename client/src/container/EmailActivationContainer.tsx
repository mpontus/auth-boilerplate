import * as React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as yup from "yup";
import {
  emailActivationCompleteAction,
  emailActivationRequestAction
} from "../action/emailActivationActions";
import { Button } from "../component/Button";
import { ErrorMessage } from "../component/ErrorMessage";
import { Field } from "../component/Field";
import { Form } from "../component/Form";
import { Input } from "../component/Input";
import { Paragraph } from "../component/Paragraph";
import { EmailActivationCompleteDto } from "../model/EmailActivationCompleteDto";
import { EmailActivationRequestDto } from "../model/EmailActivationRequestDto";
import { RequestError } from "../model/RequestError";
import {
  makeGetEmailActivationRequestError,
  makeIsEmailActivationRequestLoading,
  makeIsEmailActivationRequestSuccess
} from "../selector/emailActivationSelectors";

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
  error?: RequestError<EmailActivationRequestDto & EmailActivationCompleteDto>;

  /**
   * Handle email activation request submission
   */
  onSubmitRequest: (values: EmailActivationRequestDto) => void;

  /**
   * Handle activation code validation
   */
  onConfirm: (values: EmailActivationCompleteDto) => void;
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

const makeMapStateToProps = createStructuredSelector({
  loading: makeIsEmailActivationRequestLoading(),
  success: makeIsEmailActivationRequestSuccess(),
  error: makeGetEmailActivationRequestError()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onSubmitRequest: emailActivationRequestAction.request,
    onConfirm: emailActivationCompleteAction.request
  }
);

class BaseEmailActivationContainer extends React.Component<Props> {
  /**
   * Render a form for requesting another activation email
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
          Resend activation email
        </Button>
      </Form>
    ) : (
      <Paragraph>We sent activation code to your email address.</Paragraph>
    );
  }

  /**
   * Render a placeholder while validation request is happening.
   */
  public renderConfirmationProgress() {
    if (this.props.error) {
      return <ErrorMessage>{this.props.error.message}</ErrorMessage>;
    }

    if (this.props.success) {
      return <Paragraph>Your email is now activated!</Paragraph>;
    }

    return <Paragraph>Please wait...</Paragraph>;
  }

  public componentDidMount() {
    if (this.props.code) {
      this.props.onConfirm({ token: this.props.code });
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.code && this.props.code !== prevProps.code) {
      this.props.onConfirm({ token: this.props.code });
    }
  }

  public render() {
    return !this.props.code
      ? this.renderRequestForm()
      : this.renderConfirmationProgress();
  }
}

export const EmailActivationContainer = enhance(BaseEmailActivationContainer);
