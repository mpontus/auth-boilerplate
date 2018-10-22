import * as t from "io-ts";
import { ApiGateway } from "../ApiGateway";
import { sessionSchema } from "../schema/sessionSchema";
import { validateResponse } from "../utils/validateResponse";

type Result = t.TypeOf<typeof sessionSchema>;

/**
 * Authenticate user anonymously
 */
export const loginAnonymously = async (api: ApiGateway): Promise<Result> => {
  const session = await api
    .post("/auth/login/anonymous")
    .then(validateResponse(sessionSchema));

  api.auth.next(session);

  return session;
};
