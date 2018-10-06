import { getProfile } from "./getProfile";

describe("getProfile", () => {
  const response = {
    id: "87487682734",
    name: "Joshua Wood",
    email: "ebrown@hotmail.com"
  };

  it("should send a request to correct url", async () => {
    const api = {
      get: jest.fn()
    };

    api.get.mockResolvedValue({ data: response });

    await getProfile(api);

    expect(api.get).toHaveBeenCalledWith("/auth/profile");
  });

  it("should return the response", async () => {
    const api = {
      get: jest.fn()
    };

    api.get.mockResolvedValue({ data: response });

    const result = await getProfile(api as any);

    expect(result).toEqual(response);
  });

  it("should throw when response is invalid", async () => {
    const api = {
      get: jest.fn()
    };

    api.get.mockResolvedValue({ data: {} });

    const result = getProfile(api as any);

    await expect(result).rejects.toThrow();
  });
});
