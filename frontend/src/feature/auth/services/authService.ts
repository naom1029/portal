import axios from "axios";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("登録に失敗しました");
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "無効な認証情報です");
    }
    throw new Error("ログイン中にエラーが発生しました");
  }
};
