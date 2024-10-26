import { logoutUser } from "../feature/auth/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../feature/auth/store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <header className="bg-blue dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          社内ポータル
        </h1>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            ログアウト
          </button>
        )}
      </div>
    </header>
  );
}
