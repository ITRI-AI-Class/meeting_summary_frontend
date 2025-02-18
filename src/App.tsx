import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { WelcomePage } from './pages/WelcomePage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { MeetingSummaryPage } from './pages/MeetingSummaryPage';
import { ProfilePage } from './pages/ProfilePage';
// import { LoginPage } from './pages/LoginPage';
import { MeetingSummariesProvider } from './contexts/MeetingSummariesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MeetingRoomPage from './pages/MeetingRoomPage';

import './i18n';  // 引入 i18n 配置
import { PublicRoute } from './components/PublicRoute';
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            } />
            {/* <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } /> */}
            <Route path="/dashboard" element={
              <MeetingSummariesProvider>
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              </ MeetingSummariesProvider>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="meetingSummary/:id" element={<MeetingSummaryPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="meeting" element={<MeetingRoomPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}