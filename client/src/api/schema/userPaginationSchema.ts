import * as t from "io-ts";
import { userSchema } from "./userSchema";

/**
 * Describes a listing of users
 */
export const userPaginationSchema = t.type({
  total: t.number,
  items: t.array(userSchema)
});
