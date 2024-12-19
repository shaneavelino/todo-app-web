// hooks/use-tasks.ts
import useSWR, { mutate } from "swr";
import { Task, CreateTaskDto, UpdateTaskDto } from "@/types/task";

const API_URL = "http://localhost:3000/tasks";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export function useTasks() {
  const { data: tasks, error, isLoading } = useSWR<Task[]>(API_URL, fetcher);

  const createTask = async (newTask: CreateTaskDto) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to create task");

      mutate(API_URL); // Revalidate the task list
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateTask = async (id: string, data: UpdateTaskDto) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update task");

      mutate(API_URL); // Revalidate the task list
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      mutate(API_URL); // Revalidate the task list
    } catch (error) {
      console.error("Failed to delete task:", error);
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
  };
}
