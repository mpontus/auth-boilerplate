/**
 * Describes a single website user
 *
 * Exposed fields depend on the context of a request
 */
export interface User {
  /**
   * User id
   */
  id: string;

  /**
   * User name
   */
  name: string;

  /**
   * User email
   */
  email: string;

  /**
   * User roles.
   */
  roles: Array<"user" | "admin">;
}
