import React, { useState } from 'react';
import { Bell, Moon, Globe, ChevronDown } from 'lucide-react';
import { LineNotification, User, UserPreferences } from '../../types/user';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LineService from '../../services/LineService';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileSettings() {
  const { user, updateUser, isUpdating } = useAuth();
  const [lineNotification, setLineNotification] = useState<LineNotification | null>(user?.preferences.lineNotification!);
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  console.log(user)

  const handleLineBinding = async () => {
    const response = await LineService.login(user!.id);
    if (response.data) {
      window.location.href = response.data as string;
    }
  };

  const handleLineUnbinding = async () => {
    const updatedPreferences: UserPreferences = {
      ...user!.preferences,
      lineNotification: null,
    };
    console.log(updatedPreferences);
    await updateUser(updatedPreferences);
    console.log(user);
    setLineNotification(null);
  }

  const handleLineNotificationToggle = async () => {
    const updatedLineNotification: LineNotification = {
      ...user!.preferences.lineNotification!,
      enabled: !user!.preferences.lineNotification!.enabled,
    }
    const updatedPreferences: UserPreferences = {
      ...user!.preferences,
      lineNotification: updatedLineNotification,
    };
    await updateUser(updatedPreferences);
    setLineNotification(updatedLineNotification);
    console.log(updatedPreferences);
  };

  const handleLanguageChange = async (lng: string) => {
    i18n.changeLanguage(lng);
    const updatedPreferences: UserPreferences = {
      ...user!.preferences,
      language: lng
    };
    await updateUser(updatedPreferences);
    setIsLanguageMenuOpen(false);
  };

  const handleDarkModeToggle = async () => {
    toggleDarkMode();
    const updatedPreferences = {
      ...user!.preferences,
      darkMode: !user!.preferences.darkMode,
    };
    await updateUser(updatedPreferences);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t('profile_settingsTitle')}
      </h3>

      {/* 語言切換選單 */}
      <div className="relative">
        <div
          className="flex justify-between items-center w-full px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        >
          <div className="flex items-center space-x-4">
            <Globe className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white text-lg">
              {t('language')}
            </span>
          </div>
          <div className="flex items-center space-x-2 dark:text-white">
            <div > {i18n.language === 'en' ? "English" : "中文"}</div>
            <ChevronDown className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {isLanguageMenuOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 max-h-64 bg-white rounded-md dark:bg-gray-800 overflow-hidden z-10">
            <button
              className="px-6 w-full text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 py-4 rounded-lg"
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              className="px-6 w-full text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 py-4 rounded-lg"
              onClick={() => handleLanguageChange('zh')}
            >
              中文
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {lineNotification ? (
          <div>
            {/* ✅ 讓 LINE Notification 佔滿版面，並讓 ChevronDown 右對齊 */}
            <div
              className="flex justify-between items-center w-full px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
              onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
            >
              <div className="flex items-center space-x-4">
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white text-lg">
                  {t('lineNotification.title')}
                </span>
              </div>
              <div className="ml-auto">
                <ChevronDown className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${isNotificationMenuOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* ✅ 展開選單對齊，確保 `LINE Notification` 開關和刪除帳號可以點擊 */}
            {isNotificationMenuOpen && (
              <div className="w-full bg-gray-50 dark:bg-gray-900 py-4 space-y-4">
                <div className="flex items-center justify-between py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer px-6 rounded-lg">
                  <div className='flex items-center space-x-4'>
                    <div className="text-gray-600 dark:text-gray-400 invisible">
                      <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{t('lineNotification.active')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('lineNotification.activeDesc')}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLineNotificationToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${lineNotification.enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                  >
                    <span
                      className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${lineNotification.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
                <div className="flex items-center space-x-3 justify-between px-6">
                  <div className='flex items-center space-x-4'>
                    <div className="text-gray-600 dark:text-gray-400 invisible">
                      <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{t('lineNotification.lineId')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lineNotification.uid}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={handleLineUnbinding}
                      disabled={isUpdating}
                      className={`
            border-2 border-green-500 text-green-500 rounded-lg 
            px-4 py-2 hover:bg-green-500 hover:text-white transition-all`}
                    >
                      {isUpdating ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                      ) : (
                        t('lineNotification.unbind')
                      )}
                    </button>
                  </div>
                </div>
              </div>)
            }
          </div>
        )
          : (
            <SettingButton
              className="px-6 py-4 bg-transparent rounded-lg transition"
              icon={<Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />}
              label={t('profile_settings.lineNotifications')}
              description={t('profile_settings.lineNotificationsDesc')}
              btnName={t('lineNotification.bind')}
              onClick={() => handleLineBinding()}
            />
          )}

        <SettingToggle
          className="px-6 py-4 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg transition"
          icon={<Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />}
          label={t('profile_settings.darkMode')}
          description={t('profile_settings.darkModeDesc')}
          checked={isDarkMode}
          onChange={() => handleDarkModeToggle()}
        />
      </div>
    </div>
  );
}

function SettingToggle({
  className,
  icon,
  label,
  description,
  checked,
  onChange
}: {
  className?: string,
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`} onClick={onChange}>
      <div className="flex items-center space-x-4">
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="relative">
        <button
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

function SettingButton({
  className,
  icon,
  label,
  description,
  btnName,
  onClick
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  btnName: string;
  onClick: () => void;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={onClick}
          className={`
            border-2 border-green-500 text-green-500 rounded-lg 
            px-4 py-2 hover:bg-green-500 hover:text-white transition-all
            `}
        >
          {btnName}
        </button>
      </div>
    </div>
  );
}