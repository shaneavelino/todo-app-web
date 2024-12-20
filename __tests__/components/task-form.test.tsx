import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "@/components/tasks/task-form";
import { Color, Task } from "@/types/task";
import { act } from "react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();
  const mockPush = jest.fn();

  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    color: Color.BLUE,
    completed_status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders empty form in create mode", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);
    expect(screen.getByPlaceholderText(/brush your teeth/i)).toHaveValue("");
    expect(
      screen.getByRole("button", { name: /create task/i })
    ).toBeInTheDocument();
  });

  it("renders pre-filled form in edit mode", () => {
    render(
      <TaskForm task={mockTask} onSubmit={mockOnSubmit} onClose={mockOnClose} />
    );
    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save task/i })
    ).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText(/brush your teeth/i);
    act(() => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "New Task",
      color: null,
      completed_status: false,
    });
  });

  it("navigates home when the back button is clicked", async () => {
    const user = userEvent.setup();

    render(<TaskForm onSubmit={mockOnSubmit} onClose={jest.fn()} />);

    const backButton = screen.getByRole("button", {
      name: /back arrow icon/i,
    });

    await user.click(backButton);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    const submitButton = screen.getByRole("button", { name: /create task/i });
    expect(submitButton).toBeDisabled();

    const input = screen.getByPlaceholderText(/brush your teeth/i);
    act(() => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    expect(submitButton).toBeEnabled();
  });

  it("handles color selection", async () => {
    const user = userEvent.setup();
    render(<TaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    const input = screen.getByPlaceholderText(/brush your teeth/i);
    act(() => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    // Find color buttons by their style attribute
    const colorButtons = screen
      .getAllByRole("button")
      .filter((button) =>
        button.getAttribute("style")?.includes("background-color")
      );

    act(() => {
      fireEvent.click(colorButtons[0]);
    });

    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        completed_status: false,
      })
    );
  });
});
