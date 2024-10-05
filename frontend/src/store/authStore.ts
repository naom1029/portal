import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token: string | null) =>
        set(() => ({
          token,
          isAuthenticated: !!token,
        })),
      logout: () =>
        set(() => ({
          token: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth-storage", // ストレージキーの名前
    }
  )
);
