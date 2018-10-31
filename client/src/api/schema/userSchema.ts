import * as t from "io-ts";

/**
 * Describes shape of session response
 */
export const userSchema = t.type({
  id: t.string,
  name: t.string,
  email: t.string,
  emailVerified: t.boolean,
  roles: t.array(t.union([t.literal("admin"), t.literal("user")]))
});
