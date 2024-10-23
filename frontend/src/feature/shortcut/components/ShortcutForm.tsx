import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Shortcut } from "../types/types";

type ShortcutFormProps = {
  onAddShortcut: (shortcut: Shortcut) => void;
};

export default function ShortcutForm({ onAddShortcut }: ShortcutFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      try {
        const ShortcutItem: Shortcut = {
          id: null,
          title,
          url,
        };
        onAddShortcut(ShortcutItem);
        setTitle("");
        setUrl("");
        setError(null);
      } catch (err: any) {
        setError(
          err.response?.data?.error || "ショートカットの追加に失敗しました"
        );
      }
    } else {
      setError("タイトルとURLを入力してください");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="ショートカットタイトル"
          value={title}
          onChange={(e) => {
            setError(null);
            setTitle(e.target.value);
          }}
          className="flex-grow px-4 py-2 border rounded-md"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => {
            setError(null);
            setUrl(e.target.value);
          }}
          className="flex-grow px-4 py-2 border rounded-md ml-2"
          required
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-600 text-white rounded-md flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          追加
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
