import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Shortcut } from "../types/types";

type ShortcutFormProps = {
  onAddShortcut: (shortcut: Omit<Shortcut, "id">) => void;
};

export default function ShortcutForm({ onAddShortcut }: ShortcutFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAddShortcut({ title, url });
      setTitle("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="ショートカットタイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <input
        type="url"
        placeholder="URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        ショートカットを追加
      </button>
    </form>
  );
}
