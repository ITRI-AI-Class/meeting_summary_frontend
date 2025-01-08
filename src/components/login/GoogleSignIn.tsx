// src/GoogleSignIn.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { setGoogleUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 登入成功後，你可以獲取用戶資料並跳轉到儀表板
      console.log('User Info:', user);

      setGoogleUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
