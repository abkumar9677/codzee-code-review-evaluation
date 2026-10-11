import { describe, expect, it } from "vitest";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../src/validation/taskSchemas";

describe("createTaskSchema", () => {
  it("accepts a valid task", () => {
    expect(
      createTaskSchema.safeParse({
        title: "Prepare interview notes",
        description: "Review Node.js concepts",
      }).success,
    ).toBe(true);
  });

  it("trims whitespace from the title", () => {
    const result = createTaskSchema.safeParse({
      title: "  Complete assignment  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Complete assignment");
    }
  });

  it.each(["", "   "])("rejects an empty title: %j", (title) => {
    expect(createTaskSchema.safeParse({ title }).success).toBe(false);
  });

  it("rejects titles longer than 120 characters", () => {
    expect(
      createTaskSchema.safeParse({ title: "a".repeat(121) }).success,
    ).toBe(false);
  });

  it("rejects descriptions longer than 500 characters", () => {
    expect(
      createTaskSchema.safeParse({
        title: "Valid title",
        description: "a".repeat(501),
      }).success,
    ).toBe(false);
  });
});

describe("updateTaskSchema", () => {
  it("accepts a partial update", () => {
    expect(updateTaskSchema.safeParse({ completed: true }).success).toBe(true);
  });

  it("rejects an empty update", () => {
    expect(updateTaskSchema.safeParse({}).success).toBe(false);
  });

  it("rejects an invalid completion value", () => {
    expect(updateTaskSchema.safeParse({ completed: "yes" }).success).toBe(false);
  });

  it("rejects an empty title in an update", () => {
    expect(updateTaskSchema.safeParse({ title: " " }).success).toBe(false);
  });
});
