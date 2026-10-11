import { describe, expect, it } from "vitest";
import { HttpError, toErrorResponse } from "../src/middleware/errorResponse";

describe("toErrorResponse", () => {
  it("preserves a safe client-facing error", () => {
    expect(toErrorResponse(new HttpError(404, "Task not found"))).toEqual({
      statusCode: 404,
      body: { error: "Task not found" },
    });
  });

  it("handles a forbidden request", () => {
    expect(toErrorResponse(new HttpError(403, "Forbidden"))).toEqual({
      statusCode: 403,
      body: { error: "Forbidden" },
    });
  });

  it("does not expose unexpected error details", () => {
    const error = new Error("Database password=secret; connection failed");

    expect(toErrorResponse(error)).toEqual({
      statusCode: 500,
      body: { error: "Internal server error" },
    });
  });

  it("handles non-Error values safely", () => {
    expect(toErrorResponse("unexpected failure")).toEqual({
      statusCode: 500,
      body: { error: "Internal server error" },
    });
  });

  it("rejects invalid HTTP error status codes", () => {
    expect(() => new HttpError(200, "Not an error")).toThrow(RangeError);
    expect(() => new HttpError(404.5, "Invalid status")).toThrow(RangeError);
  });
});
