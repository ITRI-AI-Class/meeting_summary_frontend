import React from 'react';
import { Bell, Moon, Globe } from 'lucide-react';
import { User } from '../../types/user';
import { useTheme } from '../../contexts/ThemeContext';

interface ProfileSettingsProps {
  user: User;
  onUpdatePreferences: (preferences: User['preferences']) => void;
}

export function ProfileSettings({ user, onUpdatePreferences }: ProfileSettingsProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleToggle = (key: keyof User['preferences']) => {
    if (key === 'darkMode') {
      toggleDarkMode();
    }
    onUpdatePreferences({
      ...user.preferences,
      [key]: !user.preferences[key]
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
      
      <div className="space-y-4">
        <SettingToggle
          icon={<Bell className="w-5 h-5" />}
          label="Email Notifications"
          description="Receive email updates about your meetings"
          checked={user.preferences.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        />
        
        <SettingToggle
          icon={<Globe className="w-5 h-5" />}
          label="System Alerts"
          description="Get notified when processing is complete"
          checked={user.preferences.systemAlerts}
          onChange={() => handleToggle('systemAlerts')}
        />
        
        <SettingToggle
          icon={<Moon className="w-5 h-5" />}
          label="Dark Mode"
          description="Switch between light and dark themes"
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
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}
          `}
        >
          <span
            className={`
              absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${checked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    </div>
  );
}