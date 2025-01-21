import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileSettings } from "../components/profile/ProfileSettings";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { User } from "../types/user";
export function ProfilePage() {
  const [userPreferences, setUserPreferences] = useState<User["preferences"]>({
      emailNotifications: true,
      systemAlerts: true,
      darkMode: false,
    });
   const { user: currentUser } = useAuth();
  const { user, isLoading, error, updateUser } = useUser(currentUser!);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "zh"
    
  );
 
  // 初始化語言設定
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // 儲存語言設定
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdatePreferences = (preferences: typeof user.preferences) => {
    setUserPreferences(preferences); // 更新狀態
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* <ProfileHeader user={user} onEdit={handleEdit} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileSettings
            user={user}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </div>
      </div>
      {/* Language switcher */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={() => handleLanguageChange("zh")}
            className={`flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg ${
              language === "zh"
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            } transition-colors`}
          >
            中文
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg ${
              language === "en"
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            } transition-colors`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
