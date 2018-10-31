import { AxiosError } from "axios";
import { ValidationError } from "class-validator";

type ErrorDetails<T> = { [P in keyof T]?: string };

export class RequestError<T> extends Error {
  public static fromApiError<T>(error: AxiosError): RequestError<T> {
    const { response } = error;

    // Non-API error, programmer mistake.
    if (response === undefined) {
      return new RequestError<T>(error.message);
    }

    // 500 error
    if (response.data.message === null || response.data.message === undefined) {
      return new RequestError<T>("An error occured. Please try again later.");
    }

    // Validation error
    if (Array.isArray(response.data.message)) {
      const errors: ValidationError[] = response.data.message;

      const details = errors.reduce((acc, { property, constraints }) => {
        const keys = Object.keys(constraints);

        if (keys.length === 0) {
          return acc;
        }

        return {
          ...acc,
          [property]: constraints[keys[0]]
        };
      }, {});

      return new RequestError("Validation Error", details);
    }

    // Different kind of error with human-readalble message
    return new RequestError(response.data.message);
  }

  public readonly details: ErrorDetails<T> | undefined;

  constructor(message: string, details?: ErrorDetails<T>) {
    super(message);

    this.details = details;
  }
}
