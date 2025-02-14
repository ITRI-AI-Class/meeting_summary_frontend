import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isChecked, user } = useAuth();
  console.log("PrivateRoute");

  if (!isChecked) {
    if (user) {
      // 用戶已加載且存在
      return "";
    }
  } else {
    if (user) {
      // 用戶已加載且存在
      return <>{children}</>;
    } else {
      // 如果沒有用戶，跳轉到登入頁
      return <Navigate to="/welcomePage" replace />;
    }
  }
}