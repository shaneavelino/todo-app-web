import { render, screen } from "@testing-library/react";
import { Counter } from "@/components/ui/counter";
import { Task } from "@/types/task";

describe("Counter", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      completed_status: true,
      color: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Task 2",
      completed_status: false,
      color: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Task 3",
      completed_status: false,
      color: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it("displays correct total tasks count", () => {
    render(<Counter tasks={mockTasks} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays correct completed tasks count", () => {
    render(<Counter tasks={mockTasks} />);
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("handles empty tasks array", () => {
    render(<Counter tasks={[]} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("0 of 0")).toBeInTheDocument();
  });
});
