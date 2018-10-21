import { ApiGateway } from "../ApiGateway";

interface Params {
  token: string;
}

/**
 * Activate email address using secret code
 */
export const emailActivationComplete = (api: ApiGateway, { token }: Params) =>
  api.post(`/email/email_activation/verify/${token}`).then(() => undefined);
