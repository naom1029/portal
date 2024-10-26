import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: User | null) =>
        set(() => ({
          user,
          isAuthenticated: !!user,
        })),
      logout: () =>
        set(() => ({
          isAuthenticated: false,
          user: null,
        })),
      initializeAuth: () => {
        // クッキーやセッションストレージを確認して認証状態をリセットする
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          // クッキーがなければ認証状態をクリアする
          set(() => ({
            isAuthenticated: false,
            user: null,
          }));
        }
      },
    }),
    {
      name: "auth-storage", // ストレージキーの名前
    }
  )
);
