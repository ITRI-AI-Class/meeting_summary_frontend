import React from 'react';
import { Video, Upload, Home, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">MeetingMind</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <NavLink to="/" icon={<Home className="w-5 h-5" />} text="Home" />
            <NavLink to="/upload" icon={<Upload className="w-5 h-5" />} text="Upload" />
            <NavLink to="/profile" icon={<User className="w-5 h-5" />} text="Profile" />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}