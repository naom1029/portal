import { useCallback } from "react";
import axios from "axios";
import { Shortcut } from "../types/types";

export const useShortcutActions = () => {
  const fetchShortcuts = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get<Shortcut[]>(
      `${apiUrl}/api/shortcuts/user/me/fetch`,
      { withCredentials: true }
    );
    return response.data;
  }, []);

  const addShortcut = useCallback(
    async (shortcut: Omit<Shortcut, "id">): Promise<Shortcut> => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post<Shortcut>(
        `${apiUrl}/api/shortcuts/user/me/add`,
        shortcut,
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    },
    []
  );

  return { fetchShortcuts, addShortcut };
};
