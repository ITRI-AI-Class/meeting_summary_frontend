import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Users, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  // 初始化語言設定
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // 儲存語言設定
  };

  const menuItems = [
    { icon: <FileText className="w-5 h-5" />, label: t('meetingNotes'), path: '/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: t('profile'), path: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard')}</h1>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language switcher */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageChange('zh')}
                className={`flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg ${
                  language === 'zh'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                中文
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex-1 px-4 py-2 text-center text-sm font-medium rounded-lg ${
                  language === 'en'
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                English
              </button>
            </div>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logout')}</span>
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
