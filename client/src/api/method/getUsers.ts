import { ApiGateway } from "../ApiGateway";
import { userPaginationSchema } from "../schema/userPaginationSchema";
import { validateResponse } from "../utils/validateResponse";

interface Params {
  skip: number;
  take: number;
}

export const getUsers = (api: ApiGateway, { skip, take }: Params) =>
  api
    .get(`/users?skip=${skip}&take={take}`)
    .then(validateResponse(userPaginationSchema));
