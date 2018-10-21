import { ApiGateway } from "../ApiGateway";

interface Params {
  token: string;
  password: string;
}

/**
 * Complete password recovery by resetting password
 */
export const passwordRecoveryComplete = (
  api: ApiGateway,
  { token, password }: Params
) =>
  api
    .post(`/email/password_recovery/verify/${token}`, { password })
    .then(() => undefined);
