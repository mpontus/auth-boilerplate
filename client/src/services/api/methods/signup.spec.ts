import { signup } from "./signup";

describe("signup", () => {
  const name = "Joshua Wood";
  const email = "dillondelacruz@shaw.com";
  const password = "x6tnBEr4&i";
  const response = {
    id: "38478357",
    name,
    email
  };

  it("should send credentials to valid endpoint", async () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: response });

    await signup(api as any, { name, email, password });

    expect(api.post).toHaveBeenCalledWith("/auth/signup", {
      name,
      email,
      password
    });
  });

  it("should return user object", async () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: response });

    const result = await signup(api as any, { name, email, password });

    expect(result).toEqual(response);
  });

  it("should throw on invalid response", () => {
    const api = {
      post: jest.fn(),
      emit: jest.fn()
    };

    api.post.mockResolvedValue({ data: {} });

    expect(signup(api as any, { name, email, password })).rejects.toThrow();
  });
});
