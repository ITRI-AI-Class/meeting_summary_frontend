import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
    title: string;
  onDelete: () => void;
}

export function DeleteButton({title, onDelete}: DeleteButtonProps) {
  return (
    <button
        onClick={onDelete}
        className="
            px-2.5 py-1.5 rounded-md border
            bg-white border-red-300
            text-red-600 hover:bg-red-50 
            dark:text-gray-100 dark:hover:bg-red-600 dark:bg-red-500
            dark:border-transparent transition-colors
        "
        title={title}
      >
        <Trash2 className="w-4 h-4" />
      </button>
  );
}
