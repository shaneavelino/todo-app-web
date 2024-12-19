import { Task } from "@/types/task";
import { TaskCard } from "./task-card";

interface TaskListProps {
  tasks: Task[] | undefined; // Update the type to allow undefined
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks) return null; // Handle the undefined case

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
