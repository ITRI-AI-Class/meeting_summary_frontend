import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';

export function Layout() {
  const location = useLocation();

  if (location.pathname !== '/login') {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />
      <main className="container mx-auto px-4 py-8 pt-24">
        <Outlet />
      </main>
    </div>
  );
}