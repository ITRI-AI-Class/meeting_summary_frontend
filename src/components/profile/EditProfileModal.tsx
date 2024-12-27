import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../../types/user';
import { EditProfileForm } from './EditProfileForm';
import { Toast } from '../common/Toast';

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => Promise<boolean>;
}

export function EditProfileModal({ 
  user, 
  isOpen, 
  isLoading,
  error,
  onClose, 
  onSave 
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name,
    email: user.email,
    language: user.language
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSave(formData);
    if (success) {
      setShowSuccessToast(true);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}

          <EditProfileForm
            user={user}
            formData={formData}
            isLoading={isLoading}
            onChange={setFormData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {showSuccessToast && (
        <Toast
          type="success"
          message="Profile updated successfully!"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </>
  );
}