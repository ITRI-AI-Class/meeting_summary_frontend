import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Users, Shield, Globe, ArrowRight } from 'lucide-react';
import { ParallaxHero } from '../components/welcome/ParallaxHero';
import { FeatureCard } from '../components/welcome/FeatureCard';
import { StepCard } from '../components/welcome/StepCard';
import { Footer } from '../components/welcome/Footer';
import GoogleSignIn from '../components/login/GoogleSignIn';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export function WelcomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isChecked,user } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500 ${!isChecked ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center">
          <Video className="w-12 h-12 text-indigo-600 animate-bounce" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{t('loading')}</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className={`min-h-screen transition-opacity duration-500 ${!isChecked ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <Video className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-semibold text-gray-900">{t('appName')}</span>
              </div>
              <div className="flex items-center space-x-4">
                {user ?
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-auto px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    {t('dashboard')}
                  </button>
                  : <GoogleSignIn />
                }
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <ParallaxHero onLoad={() => setIsLoading(false)} />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {t('description')}
            </p>
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
                delay={0}
              />
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title={t('feature2')}
                description={t('feature2Desc')}
                delay={200}
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8" />}
                title={t('feature3')}
                description={t('feature3Desc')}
                delay={400}
              />
              <FeatureCard
                icon={<Globe className="w-8 h-8" />}
                title={t('feature4')}
                description={t('feature4Desc')}
                delay={600}
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

        <Footer />
      </div>
    </>
  );
}