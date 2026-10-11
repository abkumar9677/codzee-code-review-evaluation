export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly publicMessage: string,
  ) {
    super(publicMessage);
    this.name = "HttpError";

    if (
      !Number.isInteger(statusCode) ||
      statusCode < 400 ||
      statusCode > 599
    ) {
      throw new RangeError("HTTP error status must be an integer between 400 and 599");
    }
  }
}

export interface ErrorResponse {
  statusCode: number;
  body: {
    error: string;
  };
}

export function toErrorResponse(error: unknown): ErrorResponse {
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      body: { error: error.publicMessage },
    };
  }

  return {
    statusCode: 500,
    body: { error: "Internal server error" },
  };
}
