import React, { useEffect, useState } from 'react';
import { Video, Upload, Home, User, LogOut, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // 初始化語言設定
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // 儲存語言設定
    setShowLanguageMenu(false); // 關閉語言選單
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 左側 Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Video className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">MeetigMind</span>
          </Link>

          {/* 右側導航項目 */}
          <div className="flex items-center space-x-6">
            <NavLink to="/" icon={<Home className="w-5 h-5" />} text={t('home')} />
            <NavLink to="/upload" icon={<Upload className="w-5 h-5" />} text={t('upload')} />

            {/* Profile 與語言切換 */}
            <div className="relative">
              <NavLink to="/profile" icon={<User className="w-5 h-5" />} text={t('profile')} />
              <div className="mt-2">
                <button
                  onClick={() => setShowLanguageMenu((prev) => !prev)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('language')}</span>
                </button>
                {showLanguageMenu && (
                  <div className="absolute mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {t('english')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('zh')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {t('chinese')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{t('logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}
