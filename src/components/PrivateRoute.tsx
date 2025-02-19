import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isChecked, user } = useAuth();
  const { fetchMeetingSummaries } = useMeetingSummaries()!;
  console.log("PrivateRoute");

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await fetchMeetingSummaries();
        } catch (error) {
          console.error("Error fetching meeting summaries:", error);
        }
      }
    };

    fetchData();
  }, [fetchMeetingSummaries]); // 增加依賴 fetchMeetingSummaries，避免遺漏更新

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
