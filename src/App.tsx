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
import { LoginPage } from './pages/LoginPage';
import { MeetingSummariesProvider } from './contexts/MeetingSummariesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MeetingRoomPage from './pages/MeetingRoomPage';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <MeetingSummariesProvider>
                  <DashboardLayout />
                </ MeetingSummariesProvider>
              </PrivateRoute>}
            >
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