import axios from "axios";
import { Shortcut } from "../types/types";

export const fetchShortcuts = async (userId: number) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get<Shortcut[]>(
    `${apiUrl}/api/shortcuts/user/${userId}/fetch`
  );
  return response.data;
};

export const addShortcut = async (
  userId: number,
  shortcut: Omit<Shortcut, "id">
): Promise<Shortcut> => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.post<Shortcut>(
    `${apiUrl}/api/shortcuts/user/${userId}/add`,
    shortcut
  );
  return response.data;
};
