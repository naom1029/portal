import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  id: number;
}
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      setToken: (token: string | null) =>
        set(() => ({
          token,
          isAuthenticated: !!token,
        })),
      setUser: (user: User | null) =>
        set(() => ({
          user,
        })),
      logout: () =>
        set(() => ({
          token: null,
          isAuthenticated: false,
          user: null,
        })),
    }),
    {
      name: "auth-storage", // ストレージキーの名前
    }
  )
);
