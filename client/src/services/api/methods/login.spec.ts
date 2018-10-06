import { login } from "./login";

describe("login", () => {
  const email = "dillondelacruz@shaw.com";
  const password = "x6tnBEr4&i";
  const token = "H$4Dxli4R8";

  it("should send credentials to valid endpoint", async () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: { token } });

    await login(api as any, { email, password });

    expect(api.post).toHaveBeenCalledWith("/auth/login", { email, password });
  });

  it("should emit authStatusChange event in case of success", async () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: { token } });

    await login(api as any, { email, password });

    expect(api.emit).toHaveBeenCalledWith("authStatusChange", { token });
  });

  it("should throw on invalid response", async () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: {} });

    const promise = login(api as any, { email, password });

    await expect(promise).rejects.toThrow();
  });
});
