import { renderHook, act, waitFor } from "@testing-library/react";
import { useTasks } from "@/hooks/use-tasks";

describe("useTasks", () => {
  beforeEach(() => {
    // Clear fetch mocks
    global.fetch = jest.fn();
  });

  it("fetches tasks on mount", async () => {
    const mockTasks = [{ id: "1", title: "Test Task" }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    });

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockTasks);
    });
  });

  it("creates a new task", async () => {
    const newTask = { title: "New Task" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1", ...newTask }),
    });

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.createTask(newTask);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tasks"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(newTask),
      })
    );
  });
});
