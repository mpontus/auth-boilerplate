import { updateProfile } from "./updateProfile";

describe("updateProfile", () => {
  const update = { name: "Natalie Pope" };

  it("should send a request to correct url", async () => {
    const api = {
      patch: jest.fn()
    };

    api.patch.mockResolvedValue({ data: {} });

    await updateProfile(api as any, update);

    expect(api.patch).toHaveBeenCalledWith("/auth/profile", update);
  });
});
