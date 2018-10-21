import { ApiGateway } from "../ApiGateway";

interface Params {
  id: string;
  role: string;
}

/**
 * Remove a role from the user
 */
export const demoteUser = (api: ApiGateway, { id, role }: Params) =>
  api.delete(`/users/${id}/roles/${role}`).then(() => undefined);
