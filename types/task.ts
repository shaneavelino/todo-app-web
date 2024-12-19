export enum Color {
  RED = "#FF3B30",
  ORANGE = "#FF9500",
  YELLOW = "#FFCC00",
  GREEN = "#34C759",
  BLUE = "#007AFF",
  INDIGO = "#5856D6",
  PURPLE = "#AF52DE",
  PINK = "#FF2D55",
  BROWN = "#A2845E",
}

// Base Task interface to match Prisma schema
export interface Task {
  id: string;
  title: string;
  color: Color | null;
  completed_status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating a new task (omit generated fields)
export type CreateTaskDto = {
  title: string;
  color?: Color | null;
  completed_status?: boolean;
};

// Type for updating an existing task (all fields optional)
export type UpdateTaskDto = Partial<CreateTaskDto>;
