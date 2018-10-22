import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  name: string;
  email: string;
  password: string;
}

type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate using new account
 */
export const signup = async (
  api: ApiGateway,
  { name, email, password }: Params
): Promise<Result> => {
  const session = await api
    .post("/auth/signup", { name, email, password })
    .then(validateResponse(sessionSchema));

  api.auth.next(session);

  return session;
};
