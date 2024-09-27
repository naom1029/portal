import { useState } from "react";
import { Shortcut } from "../types/types";

export function useShortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: 1, title: "社内Wiki", url: "https://internal-wiki.example.com" },
    { id: 2, title: "勤怠管理システム", url: "https://timesheet.example.com" },
    { id: 3, title: "経費精算システム", url: "https://expenses.example.com" },
  ]);

  const addShortcut = (newShortcut: Omit<Shortcut, "id">) => {
    setShortcuts((prev) => [...prev, { ...newShortcut, id: Date.now() }]);
  };

  return { shortcuts, addShortcut };
}
