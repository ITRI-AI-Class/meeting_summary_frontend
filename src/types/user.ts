export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  status?: 'active' | 'inactive';
  language?: 'en' | 'zh';
  preferences: {
    emailNotifications: boolean;
    systemAlerts: boolean;
    darkMode: boolean;
  };
  // stats?: {
  //   totalUploads: number;
  //   totalDuration: string;
  //   commonTags: string[];
  // };
}

export interface Activity {
  id: string;
  type: 'upload' | 'process' | 'edit';
  title: string;
  date: string;
  meetingId?: number;
}