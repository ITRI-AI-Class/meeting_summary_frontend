export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferences: UserPreferences;
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

export interface UserPreferences{
  language: string;
  lineNotification: LineNotification | null;
  darkMode: boolean;
}

export interface LineNotification{
  uid: string;
  enabled: boolean;
}