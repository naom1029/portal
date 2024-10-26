import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
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
    (set, get) => ({
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

      initializeAuth: async () => {
        if (!get().isAuthenticated) {
          console.log("User is already logged out, skipping auth check");
          return;
        }
        try {
          // バックエンドのエンドポイントを呼び出して認証状態を確認
          // HttpOnly属性を設定したクッキーのため、ブラウザからはアクセスできない
          const apiUrl =
            import.meta.env.VITE_API_BASE_URL || "https://localhost:5000";
          const response = await axios.get(`${apiUrl}/api/auth/me`, {
            withCredentials: true, // クッキーを送信するための設定
          });
          const user_id = response.data.id;
          set(() => ({
            isAuthenticated: true,
            user: { id: user_id },
          }));
        } catch (error) {
          console.error("Authentication failed:", error);
          set(() => ({
            isAuthenticated: false,
            user: null,
          }));
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
