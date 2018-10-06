import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";

export const validateSchema = <TSchema extends t.Type<any>>(
  schema: TSchema,
  data: any
): t.TypeOf<TSchema> => {
  const result = schema.decode(data);

  if (result.isLeft()) {
    throw new Error(PathReporter.report(result).join("\n"));
  }

  return result.value;
};
