import * as t from "io-ts";
import { userSchema } from "./userSchema";

/**
 * Describes shape of session response
 */
export const sessionSchema = t.type({
  token: t.string,
  user: t.union([userSchema, t.undefined])
});
