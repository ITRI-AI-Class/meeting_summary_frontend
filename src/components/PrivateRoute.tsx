import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isChecked, user } = useAuth();
  const { fetchMeetingSummaries } = useMeetingSummaries()!;
  console.log("PrivateRoute");

  // **✅ 確保所有 Hooks 都在最上方執行**
  useEffect(() => {
    if (user) {
      fetchMeetingSummaries(user.id).catch((error) => {
        console.error("Error fetching meeting summaries:", error);
      });
    }
  }, [user, fetchMeetingSummaries]);

  // **✅ `isChecked` 還沒完成時，回傳 `null`，避免錯誤的 JSX**
  if (!isChecked) {
    return null;
  }

  // **✅ 如果沒有用戶，則導向登入頁**
  if (!user) {
    return <Navigate to="/welcomePage" replace />;
  }

  // **✅ 用戶已驗證，顯示內容**
  return <>{children}</>;
}
