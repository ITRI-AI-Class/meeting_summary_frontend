import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Users, Shield, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import { ParallaxHero } from '../components/welcome/ParallaxHero';
import { FeatureCard } from '../components/welcome/FeatureCard';
import { StepCard } from '../components/welcome/StepCard';
import { Footer } from '../components/welcome/Footer';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext'; // 引入認證上下文
import GoogleSignInButton from '../components/login/GoogleSignIn'; // 引入 Google 登入按鈕

export function WelcomePage() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // 使用 useAuth 來獲取用戶資料
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // 儲存語言設定
    setIsDropdownOpen(false);
  };
  // 切換語言

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Video className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">MeetingMind</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* 顯示登入或用戶名稱 */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">{t('HELLO')}, {user.name}</span>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    {t('startDashboard')}
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    {t('logout')}
                  </button>  
                </div>
              ) : (
                <GoogleSignInButton /> // 顯示更新後的 Google 登入按鈕
              )}
              {/* 語言切換按鈕 */}
              <div className="relative">
                <button
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Globe className="w-6 h-6 mr-2" />
                  {i18n.language === 'zh' ? '中文' : 'English'}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
                <div className={`absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 ${isDropdownOpen ? 'block' : 'hidden'} transition-all`}>
                  <button
                    onClick={() => handleLanguageChange('zh')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    中文
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <ParallaxHero />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {t('description')}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-500 transition-colors inline-flex items-center"
          >
            {t('freeStart')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            {t('whyChoose')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FeatureCard
              icon={<Video className="w-8 h-8" />}
              title={t('feature1')}
              description={t('feature1Desc')}
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title={t('feature2')}
              description={t('feature2Desc')}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title={t('feature3')}
              description={t('feature3Desc')}
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title={t('feature4')}
              description={t('feature4Desc')}
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            {t('howItWorks')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title={t('uploadRecording')}
              description={t('uploadDescription')}
            />
            <StepCard
              number="2"
              title={t('aiProcessing')}
              description={t('aiProcessingDescription')}
            />
            <StepCard
              number="3"
              title={t('shareCollaborate')}
              description={t('shareCollaborateDescription')}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
