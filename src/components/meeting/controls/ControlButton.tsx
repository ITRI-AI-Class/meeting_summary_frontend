import React from 'react';
import { cn } from '../../../utils/cn';

interface ControlButtonProps {
  isActive?: boolean;
  onClick: () => void;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success';
}

export function ControlButton({
  isActive = false,
  onClick,
  activeIcon,
  inactiveIcon,
  variant = 'default'
}: ControlButtonProps) {
  const baseStyles = "p-3 rounded-full transition-colors";
  const variantStyles = {
    default: isActive ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600',
    danger: 'bg-red-500 hover:bg-red-600',
    success: isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant])}
    >
      <div className="text-white">
        {isActive ? activeIcon : (inactiveIcon || activeIcon)}
      </div>
    </button>
  );
}