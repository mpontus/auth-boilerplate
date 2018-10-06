import * as t from "io-ts";
import { Api } from "../Api";
import { validateSchema } from "../utils/validateSchema";

interface Params {
  email: string;
  password: string;
}

type Result = {
  token: string;
};

const responseSchema = t.type({
  token: t.string
});

export const login = async (
  api: Api,
  { email, password }: Params
): Promise<Result> => {
  const response = await api.post("/auth/login", { email, password });

  const { token } = validateSchema(responseSchema, response.data);

  api.emit("authStatusChange", { token });

  return { token };
};
