import ReactDOM from 'react-dom';

interface LoadingDialogProps {
  message: string;
}

export function LoadingDialog({ message }:LoadingDialogProps) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 dark:bg-gray-800">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-white">{message}</p>
      </div>
    </div>,
    document.body
  );
};