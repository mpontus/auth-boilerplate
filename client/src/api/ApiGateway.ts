import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { EventEmitter } from "events";

export interface KVStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string | null): void;
  removeItem(key: string): void;
}

export interface AuthStatus {
  token: string | null;
}

export class ApiGateway extends EventEmitter {
  constructor(
    public readonly axios: AxiosInstance,
    private readonly storage: KVStore = window.localStorage
  ) {
    super();

    this.axios.interceptors.request.use(config => {
      const status = this.storage.getItem("auth");

      if (status === null) {
        return config;
      }

      const { token } = JSON.parse(status);

      config.headers.common.Auhtorization = `Bearer ${token}`;

      return config;
    });

    this.on("authStatusChange", (status: AuthStatus) => {
      this.storage.setItem("auth", JSON.stringify(status));
    });
  }

  public request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.get(url, config);
  }

  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.delete(url, config);
  }

  public head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.head(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.put(url, data, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.patch(url, data, config);
  }
}
