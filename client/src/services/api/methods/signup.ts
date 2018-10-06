import * as t from "io-ts";
import { Api } from "../Api";
import { validateSchema } from "../utils/validateSchema";

interface Params {
  name: string;
  email: string;
  password: string;
}

interface Result {
  id: string;
  name: string;
  email: string;
}

const responseSchema = t.type({
  id: t.string,
  name: t.string,
  email: t.string
});

export const signup = async (
  api: Api,
  { name, email, password }: Params
): Promise<Result> => {
  const response = await api.post("/auth/signup", { name, email, password });

  return validateSchema(responseSchema, response.data);
};
