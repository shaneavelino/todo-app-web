import { Task } from "@/types/task";

interface CounterProps {
  tasks?: Task[];
}

export function Counter({ tasks }: CounterProps) {
  const completedCount =
    tasks?.filter((task) => task.completed_status).length || 0;
  const totalCount = tasks?.length || 0;

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between gap-2 items-center">
        <p className="text-sm text-blue block">Tasks</p>
        <p className="rounded-xl bg-gray-light px-2">{totalCount}</p>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <p className="text-sm text-purple block">Completed</p>
        <p className="rounded-xl bg-gray-light px-2">
          {completedCount} of {totalCount}
        </p>
      </div>
    </div>
  );
}
