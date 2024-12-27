import React, { useState } from 'react';
import { Activity, User } from '../types/user';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ActivityFeed } from '../components/profile/ActivityFeed';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useUser } from '../hooks/useUser';

// Sample data - In a real app, this would come from an API
const SAMPLE_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  status: 'active',
  language: 'en',
  preferences: {
    emailNotifications: true,
    systemAlerts: true,
    darkMode: false
  },
  stats: {
    totalUploads: 12,
    totalDuration: '8h 45m',
    commonTags: ['Planning', 'Strategy', 'Review']
  }
} as User;

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'upload',
    title: 'Uploaded "Q1 2024 Planning Session"',
    date: 'Mar 15, 2024',
    meetingId: 1
  },
  {
    id: '2',
    type: 'process',
    title: 'Completed processing "Product Team Sync"',
    date: 'Mar 14, 2024',
    meetingId: 2
  },
  {
    id: '3',
    type: 'edit',
    title: 'Updated profile information',
    date: 'Mar 13, 2024'
  }
];

export function ProfilePage() {
  const { user, isLoading, error, updateUser } = useUser(SAMPLE_USER);
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
        <div className="lg:col-span-2 space-y-8">
          <ProfileStats stats={user.stats} />
          <ActivityFeed activities={SAMPLE_ACTIVITIES} />
        </div>
        
        <div className="lg:col-span-1">
          <ProfileSettings 
            user={user}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </div>
      </div>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        isLoading={isLoading}
        error={error}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateUser}
      />
    </div>
  );
}