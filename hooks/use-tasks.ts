import useSWR from "swr";
import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

export const API_URL = "http://localhost:3000/tasks";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export function useTasks() {
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR<Task[]>(API_URL, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 0,
  });

  const updateTask = async (id: string, data: UpdateTaskDto) => {
    if (!tasks) return;

    try {
      const optimisticData = tasks.map((task) =>
        task.id === id
          ? { ...task, completed_status: !task.completed_status }
          : task
      );

      await mutate(optimisticData, { revalidate: false });

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update task");

      // Force revalidation to get fresh data
      await mutate(undefined, { revalidate: true });
    } catch (error) {
      await mutate();
      throw error;
    }
  };

  const createTask = async (newTask: CreateTaskDto) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Failed to create task");
      await mutate();
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      await mutate(undefined, { revalidate: true });
    } catch (error) {
      throw error;
    }
  };

  const searchTasks = async (query: string) => {
    try {
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to search tasks");
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    tasks,
    error,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
  };
}
