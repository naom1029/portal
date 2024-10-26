import { useCallback, useState } from "react";
import { useAuthStore } from "../../auth/store/authStore";
import { Shortcut } from "../types/types";
import { useShortcutActions } from "../services/shortutsService";

export function useShortcuts() {
  const [shortcuts, setShortcuts] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);
  const {
    fetchShortcuts: fetchShortcutsService,
    addShortcut: addShortcutService,
  } = useShortcutActions();

  const fetchShortcuts = useCallback(async () => {
    if (user?.id) return;

    try {
      const data = await fetchShortcutsService();
      setShortcuts(data);
    } catch (error) {
      console.error("ショートカットの取得に失敗しました", error);
    }
  }, [user?.id, fetchShortcutsService]);

  const addShortcut = useCallback(
    async (shortcut: Omit<Shortcut, "id">) => {
      if (!user?.id) return;

      try {
        const newShortcut = await addShortcutService(user.id, shortcut);
        setShortcuts((prevShortcuts) => [...prevShortcuts, newShortcut]);
      } catch (error) {
        console.error("ショートカットの追加に失敗しました", error);
      }
    },
    [user?.id, addShortcutService]
  );

  return { shortcuts, addShortcut, fetchShortcuts };
}
