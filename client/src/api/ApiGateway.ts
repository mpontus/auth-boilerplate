import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { BehaviorSubject } from "rxjs";

const AUTH_KEY = "auth";

/**
 * Authentication state maintained by API Gateway
 */
export interface AuthState {
  /**
   * Access token injected into the requests
   */
  token: string | null;

  /**
   * Details about the user associated with the session
   */
  user?: { id: string; name: string };
}

/**
 * Helper function to retrieve auth state from persistent storage
 */
const getAuthState = (storage: Storage): AuthState | null => {
  try {
    const currentValue = storage.getItem(AUTH_KEY);

    if (currentValue === null) {
      return null;
    }

    return JSON.parse(currentValue);
  } catch {
    return null;
  }
};

/**
 * Helper function to save auth state to persistent storage
 */
const setAuthState = (storage: Storage, value: AuthState | null): void => {
  if (value === null) {
    storage.removeItem(AUTH_KEY);
  } else {
    storage.setItem(AUTH_KEY, JSON.stringify(value));
  }
};

/**
 * API Gateway
 *
 * Maintains session authentication details and provides request
 * services to concrete API methods.
 */
export class ApiGateway {
  /**
   * Observable authentication state
   *
   * API methods may write here to update session details.
   */
  public readonly auth: BehaviorSubject<AuthState | null>;

  constructor(
    public readonly axios: AxiosInstance,
    storage: Storage = window.localStorage
  ) {
    this.auth = new BehaviorSubject(getAuthState(storage));

    this.auth.subscribe(setAuthState.bind(null, storage));

    this.axios.interceptors.request.use(config => {
      const authState = this.auth.getValue();

      if (authState === null) {
        return config;
      }

      config.headers.common.Authorization = `Bearer ${authState.token}`;

      return config;
    });
  }

  /**
   * Proxy generic request to axios client
   */
  public request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.request(config);
  }

  /**
   * Proxy GET request to axios client
   */
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.get(url, config);
  }

  /**
   * Proxy DELETE request to axios client
   */
  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.delete(url, config);
  }

  /**
   * Proxy HEAD request to axios client
   */
  public head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.axios.head(url, config);
  }

  /**
   * Proxy POST request to axios client
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.post(url, data, config);
  }

  /**
   * Proxy PUT request to axios client
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.put(url, data, config);
  }

  /**
   * Proxy PATCH request to axios client
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.axios.patch(url, data, config);
  }
}
