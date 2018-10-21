import { ApiGateway } from "../ApiGateway";

interface Params {
  email: string;
}

/**
 * Resend email activation email
 */
export const emailActivationRequest = (api: ApiGateway, { email }: Params) =>
  api.post("/email/email_activation/request", { email }).then(() => undefined);
