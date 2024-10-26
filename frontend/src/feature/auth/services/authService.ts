import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:5000";

  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      username,
      email,
      password,
    });
    const setUser = useAuthStore.getState().setUser;

    setUser({ id: response.data.userId });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("登録に失敗しました");
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:5000";

  try {
    const response = await axios.post(
      `${apiUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    const setUser = useAuthStore.getState().setUser;
    setUser({ id: response.data.userId });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axiosエラー:", error.response?.data || error.message);

      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "無効な認証情報です");
      }
    } else {
      console.error("予期しないエラー:", error);
    }
    throw new Error("ログイン中にエラーが発生しました");
  }
};

export const logoutUser = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:5000";
  try {
    await axios.post(
      `${apiUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    const logout = useAuthStore.getState().logout;
    logout();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axiosエラー:", error.response?.data || error.message);

      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.message || "ログアウトに失敗しました"
        );
      }
    } else {
      console.error("予期しないエラー:", error);
    }
    throw new Error("ログアウト中にエラーが発生しました");
  }
};
