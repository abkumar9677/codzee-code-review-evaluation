export interface TaskStatus {
  completed: boolean;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
}

export function getTaskStats(tasks: TaskStatus[]): TaskStats {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return {
    total,
    completed,
    pending,
    completionPercentage:
      total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
