import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Settings, FileText, LogOut, Upload, Video, ArrowLeftToLine, AlignJustify } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [isCollapsed, setIsCollapsed] = useState(false); // 控制導覽列是否縮小

  // 初始化語言設定
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // 儲存語言設定
  };

  const menuItems = [
    { icon: <FileText className="w-5 h-5" />, label: t("meetingNotes"), path: "/dashboard" },
    { icon: <Upload className="w-5 h-5" />, label: t("upload_meeting"), path: "/dashboard/upload" },
    { icon: <Video className="w-5 h-5" />, label: t("new_meeting"), path: "/dashboard/meeting/new" },
  ];

  const handleSetting = () => {
    navigate("/dashboard/profile");
  };

  // 切換導覽列縮小/展開
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div
        className={`w-${isCollapsed ? '20' : '64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 relative`}
      >
        <div className="flex flex-col h-full">
          {/* 上方功能列 */}
          <div className="p-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className={`${isCollapsed ? 'hidden' : 'text-xl'} font-semibold text-gray-900 dark:text-white`}>
                {t("dashboard")}
              </h1>
              
              {/* Arrow button to toggle sidebar */}
              <div
                onClick={toggleSidebar}
                className="cursor-pointer transform translate-x-2 text-gray-700 dark:text-gray-200 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex justify-center items-center"
              >
                {isCollapsed ? (
                  <AlignJustify className="w-5 h-5 " />
                ) : (
                  <ArrowLeftToLine className="w-5 h-5 rounded-lg" />
                )}
              </div>
            </div>
          </div>

          {/* 導覽列項目 */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* 設定按鈕放在 "new_meeting" 下面，接近 "logout" */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSetting}
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span>{t("profile")}</span>}
            </button>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>{t("logout")}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
