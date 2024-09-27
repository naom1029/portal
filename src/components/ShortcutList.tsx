import { Shortcut } from "../types/types";

type ShortcutListProps = {
  shortcuts: Shortcut[];
};

export default function ShortcutList({ shortcuts }: ShortcutListProps) {
  return (
    <ul className="space-y-2 mb-4">
      {shortcuts.map((shortcut) => (
        <a
          href={shortcut.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${shortcut.title}を開く（新しいタブで開きます）`}
          className="block"
        >
          <li
            key={shortcut.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
          >
            <span className="text-gray-800 dark:text-gray-200">
              {shortcut.title}
            </span>
          </li>
        </a>
      ))}
    </ul>
  );
}
