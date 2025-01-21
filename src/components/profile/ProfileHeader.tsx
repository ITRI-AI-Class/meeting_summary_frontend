import React from 'react';
import { User } from '../../types/user';
import { Pencil } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  onEdit: () => void;
}

export function ProfileHeader({ user}: ProfileHeaderProps) {
  return (
    
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={user.name}
            className="w-11 h-11 rounded-full object-cover"
          />
          {/* 頭像右下角的點 */}
          {/* <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
            user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
          } border-2 border-white`} /> */}
        </div>
        
        <div> 
        <p className="text-[18px] font-bold text-gray-900">{user.name}</p>
        <p className="text-[10px] text-gray-500">{user.email}</p>
        </div>
      </div>

      // {/* <button
      //   onClick={onEdit}
      //   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      // > */}
      //   {/* <Pencil className="w-5 h-5 text-gray-600" /> */}
      // {/* </button> */}
   
  );
}