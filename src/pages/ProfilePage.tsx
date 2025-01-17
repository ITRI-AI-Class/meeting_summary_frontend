import React, { useState } from 'react';
import { Activity, User } from '../types/user';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ActivityFeed } from '../components/profile/ActivityFeed';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../contexts/AuthContext';



export function ProfilePage() {
  const { user: currentUser } = useAuth();
  const { user, isLoading, error, updateUser } = useUser(currentUser!);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdatePreferences = (preferences: typeof user.preferences) => {
    updateUser({ preferences });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader user={user} onEdit={handleEdit} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        
        <div className="lg:col-span-1">
          <ProfileSettings 
            user={user}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </div>
      </div>

     
    </div>
  );
}