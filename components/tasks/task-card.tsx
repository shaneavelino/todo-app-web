import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";
import Image from "next/image";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks();

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <div className="group bg-zinc-800 rounded-lg p-4 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updateTask(task.id, { completed_status: !task.completed_status });
          }}
          className={`w-6 h-6 rounded-xl flex items-center justify-center border-2 transition-colors ${
            task.completed_status
              ? "bg-purple-light border-purple-light"
              : "bg-transparent border-blue"
          }`}
          aria-label="Complete task"
        >
          {task.completed_status && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        <div className="flex-1 flex items-center gap-3">
          <span
            className={`flex-1 ${
              task.completed_status
                ? "line-through text-zinc-500"
                : "text-white"
            }`}
          >
            {task.title}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="text-zinc-500"
        >
          <Image src="/trash.svg" alt="Trash icon" width={24} height={24} />
        </button>
      </div>
    </Link>
  );
}
