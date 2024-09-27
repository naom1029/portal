import { Shortcut } from "../types/types";
import ShortcutItem from "./ShortcutItem";

type ShortcutListProps = {
  shortcuts: Shortcut[];
};

export default function ShortcutList({ shortcuts }: ShortcutListProps) {
  return (
    <ul className="space-y-2 mb-4">
      {shortcuts.map((shortcut) => (
        <ShortcutItem key={shortcut.id} shortcut={shortcut} />
      ))}
    </ul>
  );
}
