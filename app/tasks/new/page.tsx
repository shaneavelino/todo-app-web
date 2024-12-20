"use client";
import { TaskForm } from "@/components/tasks/task-form";
import { useTasks } from "@/hooks/use-tasks";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const { createTask } = useTasks();
  const router = useRouter();

  return (
    <TaskForm
      onSubmit={async (data) => {
        await createTask(data);
        router.push("/");
      }}
      onClose={() => router.push("/")}
    />
  );
}
