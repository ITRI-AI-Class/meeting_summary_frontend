// src/GoogleSignIn.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation


  
const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { setGoogleUser } = useAuth();
  const { t } = useTranslation(); // 使用 i18n 的翻譯功能

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 登入成功後，你可以獲取用戶資料並跳轉到儀表板
      console.log('User Info:', user);

      await setGoogleUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="w-auto px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        <div className="flex items-center justify-center space-x-2">
          {/* 使用 Google 的官方圖示 */}
          <img 
            src="https://i.imgur.com/e4N5CDJ.png" 
            alt="Google logo" 
            className="w-5 h-5"
          />
          <span>{t('googleLogin')}</span>
        </div>
      </button>
    </div>
  );
};

export default GoogleSignIn;
