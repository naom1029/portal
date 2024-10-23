import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../feature/auth/store/authStore";

export function useShortcuts() {
  const [shortcuts, setShortcuts] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);

  const fetchShortcuts = async () => {
    if (user?.id) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${apiUrl}/api/shortcuts/user/${user.id}/fetch`
        );
        setShortcuts(response.data);
      } catch (error) {
        console.error("ショートカットの取得に失敗しました", error);
      }
    }
  };

  const addShortcut = async (shortcut: any) => {
    if (user?.id) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(
          `${apiUrl}/api/shortcuts/user/${user.id}/add`,
          shortcut
        );
        setShortcuts((prevShortcuts) => [...prevShortcuts, response.data]);
      } catch (error) {
        console.error("ショートカットの追加に失敗しました", error);
      }
    }
  };

  useEffect(() => {
    fetchShortcuts();
  }, [user]);

  return { shortcuts, addShortcut, fetchShortcuts };
}
