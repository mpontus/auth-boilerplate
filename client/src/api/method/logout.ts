import { ApiGateway } from "../ApiGateway";

/**
 * Destory user session on both ends
 */
export const logout = async (api: ApiGateway): Promise<void> => {
  const authState = api.auth.getValue();

  if (authState === null) {
    throw new Error("User is not authenticated");
  }

  // Logout the user locally first in case of error on the remote side
  api.auth.next(null);

  await api.post(`/auth/logout/${authState.token}`);
};
