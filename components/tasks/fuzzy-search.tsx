"use client";
import { useState, useEffect } from "react";
import { Input } from "./input";

import * as React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";

interface FuzzySearchProps {
  onResultsChange: (results: Task[]) => void;
  tasks: Task[] | undefined;
}

export const FuzzySearch = ({
  onResultsChange,
  tasks = [],
}: FuzzySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { searchTasks } = useTasks();

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedSearch) {
        onResultsChange(tasks);
        return;
      }

      try {
        const results = await searchTasks(debouncedSearch);
        onResultsChange(results);
      } catch (error) {
        console.error("Search error: ", error);
        onResultsChange(tasks);
      }
    };

    handleSearch();
  }, [debouncedSearch]); // Remove tasks and onResultsChange from dependencies

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="whitespace-nowrap">Fuzzy Search: </label>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="font-black"
        placeholder="Search tasks..."
      />
    </div>
  );
};
