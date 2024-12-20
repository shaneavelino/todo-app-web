"use client";
import { use } from "react";
import { TaskForm } from "@/components/tasks/task-form";
import { useTasks } from "@/hooks/use-tasks";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function TaskPage({ params }: Props) {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const resolvedParams = use(params);

  const task = tasks?.find((t) => t.id === resolvedParams.id);

  if (!task) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-xl text-white mb-2">Task not found</h2>
        <p className="text-gray-400 mb-4">Task ID: {resolvedParams.id}</p>
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 hover:text-blue-400"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <TaskForm
      task={task}
      onSubmit={async (data) => {
        await updateTask(task.id, data);
        router.push("/");
      }}
      onClose={() => router.push("/")}
    />
  );
}
