import { Api } from "../Api";

type Params = Partial<{
  name: string;
  email: string;
  password: string;
  currentPassword: string;
}>;

export const updateProfile = async (
  api: Api,
  update: Params
): Promise<void> => {
  await api.patch("/auth/profile", update);
};
