import { ApiGateway } from "../ApiGateway";

interface Params {
  id: string;
}

/**
 * Delete user by ID
 */
export const deleteUser = (api: ApiGateway, { id }: Params) =>
  api.delete(`/users/${id}`).then(() => undefined);
