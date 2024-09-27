import { useState } from "react";
import { Shortcut } from "../types/types";

type ShortcutItemProps = {
  shortcut: Shortcut;
};

export default function ShortcutItem({ shortcut }: ShortcutItemProps) {
  const [hasError, setHasError] = useState(false);
  const domain = new URL(shortcut.url).hostname;

  return (
    <div>
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
          <img
            src={hasError ? "/vite.svg" : `https://${domain}/favicon.ico`}
            alt={`${shortcut.title} favicon`}
            className="h-6 w-6"
            onError={() => {
              if (!hasError) {
                setHasError(true);
              }
            }}
          />
          <span className="text-gray-800 dark:text-gray-200">
            {shortcut.title}
          </span>
        </li>
      </a>
    </div>
  );
}
