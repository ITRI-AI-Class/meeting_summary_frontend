import React from 'react';

import {  signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { setGoogleUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      // 使用 Google 登入
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // 設定 Google 使用者資訊
      setGoogleUser(user);
      // 跳轉到儀表板
      navigate('/dashboard');
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/popup-closed-by-user') {
          console.warn('Google sign-in popup was closed by the user.');
        } else {
          console.error('Error during Google sign-in:', firebaseError);
        }
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };


  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
