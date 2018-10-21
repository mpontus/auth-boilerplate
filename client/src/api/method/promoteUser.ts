import { ApiGateway } from "../ApiGateway";

interface Params {
  id: string;
  role: string;
}

/**
 * Attach a role to the user
 */
export const promoteUser = (api: ApiGateway, { id, role }: Params) =>
  api.put(`/users/${id}/roles/${role}`).then(() => undefined);
