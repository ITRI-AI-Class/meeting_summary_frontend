import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Settings,
  FileText,
  LogOut,
  Upload,
  Video,
  ArrowLeftToLine,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/useUser";

export function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [language] = useState(localStorage.getItem("language") || "Zh");
  const [isCollapsed, setIsCollapsed] = useState(false); // 控制導覽列是否縮小

  // 處理登出
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 初始化語言設定
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  // 從 useAuth 取得當前使用者
  const { user: currentUser } = useAuth();

  // 從 useUser 中獲取使用者資料
  const { user, isLoading, error } = useUser(currentUser!);

  // 檢查 user 是否正在加載
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // 切換縮排狀態
  };

  const handleSetting = () => {
    navigate("/dashboard/profile");
  };

  // 菜單項目
  const menuItems = [
    {
      icon: (
        <button
          onClick={toggleSidebar} // 點擊後觸發切換縮排狀態
          className="w-full flex items-center space-x-3 px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <img
              src={
                user?.avatarUrl ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <img
              src={
                user?.avatarUrl ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          {!isCollapsed && (
            <div className="text-left">
              <p className="text-[16px] font-bold text-gray-900 dark:text-white">
                {user?.name || "Guest"}
              </p>
              <p className="text-[12px] text-gray-500 dark:text-gray-400">
                {user?.email || ""}
              </p>
            </div>
          )}
        </button>
      ),
    },
    {
      icon: (
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center space-x-3 px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FileText className="w-6 h-6" />
          {!isCollapsed && <span className="text-lg">{t("meetingNotes")}</span>}
        </button>
      ),
      path: "/dashboard",
    },
    {
      icon: (
        <button
          onClick={() => navigate("/dashboard/upload")}
          className="w-full flex items-center space-x-3 px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Upload className="w-6 h-6" />
          {!isCollapsed && (
            <span className="text-lg">{t("upload_meeting")}</span>
          )}
        </button>
      ),
      path: "/dashboard/upload",
    },
    {
      icon: (
        <button
          onClick={() => navigate("/dashboard/meeting/new")}
          className="w-full flex items-center space-x-3 px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Video className="w-6 h-6" />
          {!isCollapsed && <span className="text-lg">{t("new_meeting")}</span>}
        </button>
      ),
      path: "/dashboard/meeting/new",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div
        className={`w-${
          isCollapsed ? "14" : "64"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* 上方功能列 */}
          <nav className="flex-1 p-4">
            {/* Arrow button to toggle sidebar
            <div
              onClick={toggleSidebar}
              className="cursor-pointer transform translate-x-2 text-gray-700 dark:text-gray-200 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex justify-center items-center"
            >
              {isCollapsed ? (
                <img
                  src={
                    user.avatarUrl ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <ArrowLeftToLine className="w-5 h-5 rounded-lg" />
              )}
            </div> */}

            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {item.icon}
                    {item.label && !isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSetting}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span>{t("profile")}</span>}
            </button>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>{t("logout")}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
