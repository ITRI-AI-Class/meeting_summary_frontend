import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick: () => void;
}

export function NavItem({ icon, label, path, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
        isActive && "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300",
        !isActive && "text-gray-700 dark:text-gray-300"
      )}
    >
      <span className={cn(
        "transition-colors",
        isActive && "text-indigo-600 dark:text-indigo-400"
      )}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}