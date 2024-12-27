export enum MeetingStatus {
  Upcoming = 'Upcoming',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum MeetingPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface Meeting {
  id: number;
  title: string;
  tags: string[];
  date: string;
  duration?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  summary?: string;
  transcript?: string;
  status: MeetingStatus;
  priority: MeetingPriority;
  attendees: string[];
  actionItems?: ActionItem[];
}

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}

export interface MeetingSegment {
  startTime: number;
  endTime: number;
  text: string;
  summary: string;
}

export interface Participant {
  id: string;
  name: string;
  stream: MediaStream;
  isMuted: boolean;
  isVideoEnabled: boolean;
}