import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User, UserPreferences } from '../types/user';
import { User as FirebaseUser, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import FirestoreService from '../services/FirestoreService';
import UserService from '../services/UserService';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeContext';

interface AuthContextType {
  isUpdating: boolean,
  isChecked: boolean;
  user: User | null;
  setGoogleUser: (firebaseUser: FirebaseUser) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: UserPreferences) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const auth = getAuth();

  const login = useCallback((username: string, password: string) => {
    if (username === 'user' && password === 'Useruser') {
      setUser({
        id: 'default_userId',
        name: 'default_userName',
        email: 'default_userEmail',
        preferences: {
          language: 'zh',
          lineNotification: {
            uid: "",
            enabled: false
          },
          darkMode: false
        },
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('uid');
      setUser(null);
      console.log('User signed out from Firebase');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, []);

  const setGoogleUser = useCallback(async (firebaseUser: FirebaseUser) => {
    const firestoreUser = await FirestoreService.fetchUserProfileData(firebaseUser.uid);
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      avatarUrl: firebaseUser.photoURL || '',
      preferences: firestoreUser?.preferences ?? {
        language: 'zh',
        lineNotification: null,
        darkMode: false,
      },
    }
    i18n.changeLanguage(user.preferences.language);
    // const docRef = doc(db, "user", firebaseUser.uid);
    // setDoc(docRef, user);
    // localStorage.setItem('uid', firebaseUser.uid);
    console.log(user);
    setUser(user);
  }, []);

  const updateUser = useCallback(async (data: UserPreferences) => {
    console.log("UPDATE");
    console.log(user);
    if (user) {
      console.log(data);
      setIsUpdating(true);
      setError(null);

      try {
        const updatedUser = await UserService.updateUserProfile(user, data);
        console.log(updatedUser);
        const docRef = doc(db, "user", user.id);
        setDoc(docRef, user);
        setUser(updatedUser);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : '更新失敗');
        return false;
      } finally {
        setIsUpdating(false);
      }
    }
    return false;
  }, [user]);

  // 初始化邏輯
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Firebase Auth 初始化檢查
        onAuthStateChanged(auth, async (firebaseUser) => {
          console.log(firebaseUser);
          if (firebaseUser) {
            await setGoogleUser(firebaseUser);
          } else {
            // // 如果沒有登入，檢查 localStorage
            // const localUid = localStorage.getItem('uid');
            // if (localUid) {
            //   const localUser = await FirestoreService.fetchUserProfileData(localUid);
            //   setUser(localUser || null);
            // }
          }
          setIsChecked(true);
        });
      } catch (err) {
        console.error('初始化錯誤:', err);
        setError('初始化失敗');
      } finally {
        // setIsChecked(true);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isUpdating, isChecked, user, setGoogleUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}