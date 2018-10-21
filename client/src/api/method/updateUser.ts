import { ApiGateway } from "../ApiGateway";
import { userSchema } from "../schema/userSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  id: string;
  update: Partial<{
    name: string;
    email: string;
    password: string;
    currentPassword: string;
  }>;
}

/**
 * Update user details
 */
export const updateUser = (api: ApiGateway, { id, update }: Params) =>
  api.patch(`/users/${id}`, update).then(validateResponse(userSchema));
