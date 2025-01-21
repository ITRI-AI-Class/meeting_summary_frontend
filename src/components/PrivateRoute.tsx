import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user , loading } = useAuth();
  // console.log(`user: ${user}`);
  // 如果正在加載，顯示 loading 標誌
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    // return <Navigate to="/login" replace />;
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}