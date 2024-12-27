import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ 
  children, 
  to, 
  onClick, 
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const baseStyles = "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors";
  const variantStyles = variant === 'primary' 
    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700";

  return (
    <button 
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}