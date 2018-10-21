import { ApiGateway } from "../ApiGateway";

interface Params {
  email: string;
}

/**
 * Request password recovery email
 */
export const passwordRecoveryRequest = (
  api: ApiGateway,
  { email }: Params
): Promise<void> =>
  api.post("/email/password_recovery/request", { email }).then(() => undefined);
