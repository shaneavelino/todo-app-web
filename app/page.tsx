"use client";
import { useState } from "react";
import { TaskList } from "@/components/tasks/task-list";
import { TaskForm } from "@/components/tasks/task-form";
import { useTasks } from "@/hooks/use-tasks";
import Image from "next/image";
import { Counter } from "@/components/ui/counter";

export default function Home() {
  const { tasks, isLoading, error, createTask } = useTasks();
  const [isCreating, setIsCreating] = useState(false);

  if (error) return <div>Failed to load tasks</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* Floating Create Task Button */}
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center justify-center gap-2 w-full mb-8 px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Create Task
        <Image src="/plus.svg" alt="Plus sign icon" width={16} height={16} />
      </button>

      <Counter tasks={tasks} />

      {/* Main Content */}
      <div className="mt-4">
        {isCreating ? (
          <TaskForm
            onSubmit={async (data) => {
              await createTask(data);
              setIsCreating(false);
            }}
            onClose={() => setIsCreating(false)}
          />
        ) : !tasks || tasks.length === 0 ? (
          <div className="text-center text-zinc-500 mt-12">
            <div className="flex justify-center items-center mb-6">
              <Image
                src="/clipboard.svg"
                alt="Clipboard image"
                width={56}
                height={56}
              />
            </div>
            <p className="font-bold">
              You don't have any tasks registered yet.
            </p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </>
  );
}
