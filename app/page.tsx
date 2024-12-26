"use client";
import Image from "next/image";
import { TaskList } from "@/components/tasks/task-list";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/use-tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FuzzySearch } from "@/components/tasks/fuzzy-search";
import { Task } from "@/types/task";

export default function Home() {
  const { tasks, isLoading, error } = useTasks();
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const router = useRouter();

  if (error) return <div>Failed to load tasks</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleSearchResults = (results: Task[]) => {
    setSearchResults(results);
  };

  const displayTasks = searchResults.length > 0 ? searchResults : tasks;

  return (
    <>
      <Button
        onClick={() => router.push("/tasks/new")}
        fullWidth
        className="mb-8"
        icon={{ src: "/plus.svg", alt: "Plus sign icon" }}
      >
        Create Task
      </Button>
      <FuzzySearch onResultsChange={handleSearchResults} tasks={tasks} />
      <Counter tasks={displayTasks} />
      <div className="mt-4">
        {!displayTasks || displayTasks.length === 0 ? (
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
              You don`&apos;`t have any tasks registered yet.
            </p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <TaskList tasks={displayTasks} />
        )}
      </div>
    </>
  );
}
