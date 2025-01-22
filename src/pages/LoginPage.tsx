import React, { useState } from 'react';
import { KeyRound, Globe } from 'lucide-react'; // 引入地球圖示
import GoogleSignIn from '../components/login/GoogleSignIn'; // 引入 Google 登入元件
import { useTranslation } from 'react-i18next'; // 引入語言切換功能

export function LoginPage() {
  const [error] = useState('');

  const { t, i18n } = useTranslation();  // 用於語言切換

  // 語言切換處理
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <KeyRound className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">{t('welcome_back')}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('please_sign_in')}</p>
        </div>

        {/* 語言切換按鈕 */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button onClick={() => handleLanguageChange('en')} className="text-gray-600 dark:text-gray-400">
            <Globe className="h-6 w-6" />
          </button>
          <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="mt-2 text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none"
            aria-label="Language selector"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-400 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          {/* 保留原有 Google 登入按鈕 */}
          <div className="flex justify-center">
            <GoogleSignIn />
          </div>
        </form>
      </div>
    </div>
  );
}
