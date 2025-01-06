import React from 'react';
import ReactDOM from 'react-dom';

interface LoadingDialogProps {
  isVisible: boolean;
  message?: string;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-700">{message || 'Loading...'}</p>
      </div>
    </div>,
    document.body
  );
};

export default LoadingDialog;
