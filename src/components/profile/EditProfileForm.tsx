import React from 'react';
import { User } from '../../types/user';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface EditProfileFormProps {
  user: User;
  formData: Partial<User>;
  isLoading: boolean;
  onChange: (data: Partial<User>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function EditProfileForm({ 
  user, 
  formData, 
  isLoading, 
  onChange, 
  onSubmit 
}: EditProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => onChange({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Language
        </label>
        <select
          value={formData.language || user.language}
          onChange={(e) => onChange({ ...formData, language: e.target.value as 'en' | 'zh' })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}