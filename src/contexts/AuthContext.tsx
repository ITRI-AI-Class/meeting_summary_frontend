import React, { createContext, useCallback, useContext, useState } from 'react';
import { User } from '../types/user';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  setGoogleUser: (firebaseUser: FirebaseUser) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User|null>(null);

  const login = useCallback((username: string, password: string) => {
    if (username === 'user' && password === 'Useruser') {
      setUser({
        id: 'default_userId',
        name: 'default_userName',
        email: 'default_userEmail',
        preferences: {
          emailNotifications: false,
          systemAlerts: false,
          darkMode: false,
        },
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const setGoogleUser = useCallback((firebaseUser: FirebaseUser) => {
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      avatarUrl: firebaseUser.photoURL || '',
      preferences: {
        emailNotifications: false,
        systemAlerts: false,
        darkMode: false,
      },
    }
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setGoogleUser, login, logout }}>
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