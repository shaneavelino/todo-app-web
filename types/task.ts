export enum Color {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  INDIGO = "INDIGO",
  PURPLE = "PURPLE",
  PINK = "PINK",
  BROWN = "BROWN",
}

export const colorMap = {
  [Color.RED]: "#FF3B30",
  [Color.ORANGE]: "#FF9500",
  [Color.YELLOW]: "#FFCC00",
  [Color.GREEN]: "#34C759",
  [Color.BLUE]: "#007AFF",
  [Color.INDIGO]: "#5856D6",
  [Color.PURPLE]: "#AF52DE",
  [Color.PINK]: "#FF2D55",
  [Color.BROWN]: "#A2845E",
};

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
