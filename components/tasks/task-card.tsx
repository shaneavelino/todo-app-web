import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks();

  return (
    <div className="group bg-zinc-800 rounded-lg p-4 flex items-center gap-3">
      <button
        onClick={() =>
          updateTask(task.id, { completed_status: !task.completed_status })
        }
        className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
          task.completed_status
            ? "bg-blue-500 border-blue-500"
            : "border-zinc-600"
        }`}
      >
        {task.completed_status && (
          <svg
            className="w-3 h-3 text-white"
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

      <span
        className={`flex-1 ${
          task.completed_status ? "line-through text-zinc-500" : "text-white"
        }`}
      >
        {task.title}
      </span>

      {task.color && (
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: task.color }}
        />
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-500 transition-opacity"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
