import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  email: string;
  password: string;
}

type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate with backend using email and password
 */
export const login = async (
  api: ApiGateway,
  { email, password }: Params
): Promise<Result> => {
  const session = await api
    .post("/auth/login", { email, password })
    .then(validateResponse(sessionSchema));

  api.auth.next(session);

  return session;
};
