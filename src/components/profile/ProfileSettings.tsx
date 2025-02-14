import React, { useState } from 'react';
import { Bell, Moon, Globe } from 'lucide-react';
import { LineNotification, User, UserPreferences } from '../../types/user';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LineService from '../../services/LineService';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileSettings() {
  const { user, updateUser } = useAuth();
  const [lineNotification, setLineNotification] = useState<LineNotification | null>(user?.preferences.lineNotification!);
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();

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
    updateUser(updatedPreferences);
    console.log(user);
    setLineNotification(null);
  }

  const handleLineNotificationToggle = () => {
    const updatedLineNotification: LineNotification = {
      ...user!.preferences.lineNotification!,
      enabled: !user!.preferences.lineNotification!.enabled,
    }
    const updatedPreferences: UserPreferences = {
      ...user!.preferences,
      lineNotification: updatedLineNotification,
    };
    updateUser(updatedPreferences);
    setLineNotification(updatedLineNotification);
    console.log(updatedPreferences);
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    const updatedPreferences = {
      ...user!.preferences,
      darkMode: !user!.preferences.darkMode,
    };
    updateUser(updatedPreferences);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('profile_settingsTitle')}
      </h3>

      <div className="space-y-4 ">
        {lineNotification ? (
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="text-gray-600 dark:text-gray-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t('profile_settings.lineNotifications')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{"Line ID:" + lineNotification.uid}</p>
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <button
                onClick={handleLineUnbinding }
                className={`
            border-2 border-green-500 text-green-500 rounded-lg 
            px-4 py-2 hover:bg-green-500 hover:text-white transition-all`}
              >
                解除綁定
              </button>
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
          </div>
        ) : (
          <SettingButton
            icon={<Bell className="w-5 h-5" />}
            label={t('profile_settings.lineNotifications')}
            description={t('profile_settings.lineNotificationsDesc')}
            btnName="綁定Line"
            onClick={() => handleLineBinding()}
          />
        )}

        <SettingToggle
          icon={<Moon className="w-5 h-5" />}
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
    <div className="flex items-center justify-between">
      <div className="flex items-start space-x-3">
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <div className="relative">
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

function SettingButton({
  icon,
  label,
  description,
  btnName,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  btnName: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start space-x-3">
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