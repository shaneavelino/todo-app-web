import { useState } from "react";
import { Color, colorMap, CreateTaskDto } from "@/types/task";

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => Promise<void>;
  onClose: () => void;
}

export function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit({
      title: title.trim(),
      color: selectedColor,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="flex flex-wrap gap-4 mb-4">
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

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
  );
}
