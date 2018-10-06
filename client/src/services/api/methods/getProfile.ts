import * as t from "io-ts";
import { Api } from "../Api";
import { validateSchema } from "../utils/validateSchema";

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

export const getProfile = async (api: Api): Promise<Result> => {
  const response = await api.get("/auth/profile");

  return validateSchema(responseSchema, response.data);
};
