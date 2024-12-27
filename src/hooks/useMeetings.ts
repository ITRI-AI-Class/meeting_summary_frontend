import { useState, useCallback } from 'react';
import { Meeting, MeetingPriority, MeetingStatus } from '../types/meeting';

const SAMPLE_MEETINGS: Meeting[] = [
  {
    id: 1,
    title: "Q1 2024 Planning Session",
    tags: ["Planning", "Strategy"],
    date: "2024-03-15",
    duration: "1:30:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    status: MeetingStatus.Completed,
    priority: MeetingPriority.High,
    attendees: []
  },
  {
    id: 2,
    title: "Product Team Sync",
    tags: ["Product", "Development"],
    date: "2024-03-14",
    duration: "45:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    status: MeetingStatus.InProgress,
    priority: MeetingPriority.High,
    attendees: []
  },
  {
    id: 3,
    title: "Marketing Campaign Review",
    tags: ["Marketing", "Review"],
    date: "2024-03-13",
    duration: "1:00:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    status: MeetingStatus.Completed,
    priority: MeetingPriority.High,
    attendees: []
  }
];

export function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(SAMPLE_MEETINGS);

  const sortMeetings = useCallback((direction: 'asc' | 'desc') => {
    setMeetings(prev => [...prev].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }));
  }, []);

  return {
    meetings,
    sortMeetings
  };
}