import { NextResponse } from "next/server";
import { ZodError, treeifyError } from "zod";
import { RequestError, ValidationError } from "../http-errors";

export type ResponseType = "api" | "server";

type TreeError = {
  errors?: string[];
  [key: string]: TreeError | string[] | undefined;
};

const flattenTreeError = (err: ZodError): Record<string, string[]> => {
  const tree = treeifyError(err) as TreeError;
  const result: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(tree)) {
    if (value && typeof value === "object" && "errors" in value) {
      result[key] = (value as TreeError).errors ?? [];
    }
  }

  return result;
};

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(flattenTreeError(error));

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    return formatResponse(responseType, 500, error.message);
  }

  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
