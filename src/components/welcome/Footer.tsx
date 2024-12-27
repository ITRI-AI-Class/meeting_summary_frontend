import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from 'lucide-react';

export function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Video className="w-6 h-6" />
              <span className="text-xl font-semibold">MeetingMind</span>
            </div>
            <p className="text-sm">
              Transform your virtual meetings with AI-powered features and seamless collaboration.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">
                  Login
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MeetingMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}