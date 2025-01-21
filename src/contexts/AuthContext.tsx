import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { User as FirebaseUser, getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setGoogleUser: (firebaseUser: FirebaseUser) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 初始化 loading 狀態

  const logout = useCallback(() => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
      console.log('User logged out');
      setLoading(false); // 登出後結束 loading
      localStorage.removeItem('user'); // 移除存儲的用戶資料
      localStorage.removeItem('meetingSummaries'); // 移除會議紀錄資料
    });
  }, []);
  // 設置 Google 用戶資料
  const setGoogleUser = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);  // 設置會話持久性

      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        avatarUrl: firebaseUser.photoURL || "",
        preferences: {
          emailNotifications: false,
          systemAlerts: false,
          darkMode: false,
        },
      };
      setUser(user); // 更新用戶資料
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  }, []);

  // 應用首次渲染時檢查用戶的登錄狀態
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 如果有，將資料載入到 user 狀態
      setLoading(false); // 完成用戶資料載入，設置 loading 為 false
    } else {
      setLoading(false); // 如果沒有用戶資料，仍然結束 loading
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("User is logged in:", firebaseUser);  // 在控制台顯示登入的用戶信息
        setGoogleUser(firebaseUser);  // 當用戶登錄時設置用戶
      } else {
        console.log("No user is logged in");  // 當沒有用戶登入時顯示訊息
        setUser(null);  // 沒有用戶登錄時設置為 null
      }
      setLoading(false); // 完成用戶資料載入，設置 loading 為 false
    });
  
    // 當組件卸載時清理訂閱
    return () => unsubscribe();
  }, [setGoogleUser]);
  
  return (
    <AuthContext.Provider value={{ user, loading, setGoogleUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 中使用');
  }
  return context;
}