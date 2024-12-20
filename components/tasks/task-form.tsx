import { useState } from "react";
import { Color, colorMap, CreateTaskDto, Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskDto) => Promise<void>;
  onClose: () => void;
}

export function TaskForm({ task, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    task?.color || null
  );
  const isEditing = Boolean(task);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({
      title: title.trim(),
      color: selectedColor,
      completed_status: task?.completed_status || false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <Button
        variant="transparent"
        onClick={() => router.push("/")}
        icon={{
          src: "/arrow-left.svg",
          alt: "Back arrow icon",
        }}
        noPadding
        className="mb-8"
      />

      <label className="text-sm text-blue block mb-2">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex. Brush your teeth"
        className="w-full bg-zinc-700 text-white rounded px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />

      <label className="text-sm text-blue block mb-2">Color</label>
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.values(Color).map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 rounded-full transition ${
              selectedColor === color ? "ring-2 ring-white" : ""
            }`}
            style={{ backgroundColor: colorMap[color] }}
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={!title.trim()}
        fullWidth
        icon={{
          src: isEditing ? "/vector.svg" : "/plus.svg",
          alt: isEditing ? "Check mark icon" : "Plus sign icon",
        }}
      >
        {isEditing ? "Save Task" : "Create Task"}
      </Button>
    </form>
  );
}
