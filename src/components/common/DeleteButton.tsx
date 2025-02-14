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
            text-red-600 dark:text-red-400 
            hover:bg-red-50 dark:hover:bg-red-900/50
        "
        title={title}
      >
        <Trash2 className="w-4 h-4" />
      </button>
  );
}
