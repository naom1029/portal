import ShortcutList from "./ShortcutList";
import ShortcutForm from "./ShortcutForm";
import { useShortcuts } from "../hooks/useSHortcuts";

export default function ShortcutSection() {
  const { shortcuts, addShortcut } = useShortcuts();

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        ウェブページショートカット
      </h2>
      <ShortcutList shortcuts={shortcuts} />
      <ShortcutForm onAddShortcut={addShortcut} />
    </section>
  );
}
