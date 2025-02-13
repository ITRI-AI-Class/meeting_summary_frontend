import React, { useState } from 'react';
import { Bell, Moon, ChevronDown, Globe } from 'lucide-react';
import { User, UserPreferences } from '../../types/user';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileSettingsProps {
  user: User;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function ProfileSettings({ user, onUpdatePreferences }: ProfileSettingsProps) {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  console.log("User data:", user);

  const handleToggle = (key: keyof User['preferences']) => {
    if (key === 'darkMode') {
      toggleDarkMode();  // ✅ 確保 `Dark Mode` 能被正確切換
    }
    onUpdatePreferences({
      ...user.preferences,
      [key]: !user.preferences[key],
    });
  };

  const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2006895970&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE&scope=profile%20openid%20email`;

  const handleNotificationToggle = () => {
    window.location.href = LINE_LOGIN_URL; // 讓使用者導向 LINE Login 授權頁面
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="space-y-6 mx-auto w-full">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('profile_settingsTitle')}
      </h3>

      <div className="w-full space-y-4">
        {/* ✅ 讓 LINE Notification 佔滿版面，並讓 ChevronDown 右對齊 */}
        <div
          className="flex justify-between items-center w-full px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
          onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
        >
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white text-lg">
              {t('profile_settings.lineNotification')}
            </span>
          </div>
          <div className="ml-auto">
            <ChevronDown className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${isNotificationMenuOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* ✅ 展開選單對齊，確保 `LINE Notification` 開關和刪除帳號可以點擊 */}
        {isNotificationMenuOpen && (
          <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm px-6 py-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {t('profile_settings.notification')}
              </span>
              <button
                onClick={handleNotificationToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.preferences.notifications.line ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
              >
                <span
                  className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.preferences.notifications.line ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-red-600 dark:text-red-400">
                <a href="#" className="hover:underline">
                  {t('profile_settings.deleteLineAccount')}
                </a>
              </span>
            </div>
          </div>
        )}
        
        {/* 語言切換選單 */}
        <div
         className="flex justify-between items-center w-full px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
         onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
       >
         <div className="flex items-center space-x-4">
           <Globe className="w-6 h-6 text-gray-600 dark:text-gray-400" />
           <span className="font-medium text-gray-900 dark:text-white text-lg">
             {t('profile_settings.language')}
           </span>
         </div>
         <div className="ml-auto">
           <ChevronDown className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
         </div>
       </div>

       {isLanguageMenuOpen && (
         <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm px-6 py-4">
           <div className="py-2">
             <button
               className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
               onClick={() => handleLanguageChange('en')}
             >
               English
             </button>
             <button
               className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
               onClick={() => handleLanguageChange('zh')}
             >
               中文
             </button>
           </div>
         </div>
       )}

        {/* ✅ 修正 Dark Mode 開關點擊問題，確保開關可以正確切換 */}
        <SettingToggle
          icon={<Moon className="w-6 h-6" />}
          label={t('profile_settings.darkMode')}
          description={t('profile_settings.darkModeDesc')}
          checked={isDarkMode}
          onChange={() => handleToggle('darkMode')}
        />

      </div>
    </div>
  );
}

function SettingToggle({
  icon,
  label,
  description,
  checked,
  onChange
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center w-full px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
    >
      <div className="flex items-center space-x-4">
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white text-lg">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="ml-auto">
        {/* ✅ 確保 Dark Mode 開關可以正確切換 */}
        <button
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
        >
          <span
            className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      </div>
    </div>
  );
}
