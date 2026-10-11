import { describe, expect, it } from "vitest";
import { getTaskStats } from "../src/taskStats";

describe("getTaskStats", () => {
  it("returns zero statistics for an empty list", () => {
    expect(getTaskStats([])).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      completionPercentage: 0,
    });
  });

  it("calculates statistics for mixed tasks", () => {
    expect(
      getTaskStats([
        { completed: true },
        { completed: false },
        { completed: true },
        { completed: false },
      ]),
    ).toEqual({
      total: 4,
      completed: 2,
      pending: 2,
      completionPercentage: 50,
    });
  });

  it("handles all-completed tasks", () => {
    expect(getTaskStats([{ completed: true }, { completed: true }])).toEqual({
      total: 2,
      completed: 2,
      pending: 0,
      completionPercentage: 100,
    });
  });

  it("handles tasks that are all pending", () => {
    expect(getTaskStats([{ completed: false }, { completed: false }])).toEqual({
      total: 2,
      completed: 0,
      pending: 2,
      completionPercentage: 0,
    });
  });

  it("rounds fractional completion percentages", () => {
    expect(
      getTaskStats([
        { completed: true },
        { completed: false },
        { completed: false },
      ]).completionPercentage,
    ).toBe(33);
  });
});
