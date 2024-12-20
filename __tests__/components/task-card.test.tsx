import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "@/components/tasks/task-card";
import { useTasks } from "@/hooks/use-tasks";
import { Color, Task } from "@/types/task";

jest.mock("@/hooks/use-tasks", () => ({
  useTasks: jest.fn(),
}));

describe("TaskCard", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    color: Color.BLUE,
    completed_status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    (useTasks as jest.Mock).mockReturnValue({
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
    });
  });

  it("renders task title", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("toggles completion status when checkbox is clicked", () => {
    render(<TaskCard task={mockTask} />);
    const checkbox = screen.getByRole("button", { name: /complete task/i });
    fireEvent.click(checkbox);
    expect(mockUpdateTask).toHaveBeenCalledWith(mockTask.id, {
      completed_status: true,
    });
  });
});
