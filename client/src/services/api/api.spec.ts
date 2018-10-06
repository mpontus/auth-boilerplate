import axios from "axios";
import * as moxios from "moxios";
import { Api, KVStore, AuthStatus } from "./Api";

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("API Service", () => {
  it("attaches authentication token to the request", async () => {
    const token = "H$4Dxli4R8";

    const storage: Partial<KVStore> = {
      getItem: (key: string) => {
        expect(key).toBe("auth");

        return JSON.stringify({
          token
        });
      }
    };

    const api = new Api(axios, storage as KVStore);

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      expect(request.config.headers.Auhtorization).toBe(`Bearer ${token}`);

      request.respondWith({
        status: 200
      });
    });

    await api.get("/");
  });

  it("saves authentication token in the storage", async () => {
    const status: AuthStatus = {
      token: "H$4Dxli4R8"
    };

    const storage: Partial<KVStore> = {
      setItem: jest.fn()
    };

    const api = new Api(axios, storage as KVStore);

    api.emit("authStatusChange", status);

    expect(storage.setItem).toHaveBeenCalledWith(
      "auth",
      JSON.stringify(status)
    );
  });
});
