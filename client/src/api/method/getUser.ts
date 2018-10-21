import { ApiGateway } from "../ApiGateway";
import { userSchema } from "../schema/userSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  id: string;
}

/**
 * Get user details by ID
 */
export const getUser = (api: ApiGateway, { id }: Params) =>
  api.get(`/users/${id}`).then(validateResponse(userSchema));
