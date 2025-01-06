import { useState, useCallback } from 'react';
import { MeetingSummary, MeetingSummaryStatus } from '../types/meetingSummaries';

const SAMPLE_MEETING_SUMMARIES: MeetingSummary[] = [
  {
    id: "ba58ea87-db21-41f2-8a85-6946cf6d753c",
    data: {
      summary: {
        title: "Q1 2024 Planning Session",
        atmosphere: [],
        content: '',
        tags: ["Planning", "Strategy"],
      },
      segments: []
    },
    date: "2024-03-15",
    duration: "1:30:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    status: MeetingSummaryStatus.Completed,
  },
  {
    id: "1ceb5486-43b7-4736-92d7-660e4ba53e75",
    data: {
      summary: {
        title: "Product Team Sync",
        atmosphere: [],
        content: '',
        tags: ["Product", "Development"],
      },
      segments: []
    },
    date: "2024-03-14",
    duration: "45:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
    status: MeetingSummaryStatus.Processing,
  },
  {
    id: "9ab8c121-a778-408b-b112-b28ce881d288",
    data: {
      summary: {
        title: "Marketing Campaign Review",
        atmosphere: [],
        content: '',
        tags: ["Marketing", "Review"],
      },
      segments: []
    },
    date: "2024-03-13",
    duration: "1:00:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    status: MeetingSummaryStatus.Completed,
  }
];

export function useMeetingSummaries() {
  const [meetingSummaries, setMeetingSummaries] = useState<MeetingSummary[]>(SAMPLE_MEETING_SUMMARIES);

  const sortMeetingSummaries = useCallback((direction: 'asc' | 'desc') => {
    setMeetingSummaries(prev => [...prev].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }));
  }, []);

  // 新增 addMeetingSummary 方法
  const addMeetingSummary = useCallback((newMeeting: MeetingSummary) => {
    console.log('New Meeting Summary:', newMeeting);
    setMeetingSummaries(prev => {
      const updatedSummaries = [...prev, newMeeting];
      console.log('Updated Meeting Summaries:', updatedSummaries);
      return updatedSummaries;
    });
  }, []);

  return {
    meetingSummaries,
    sortMeetingSummaries,
    addMeetingSummary, // 將新增方法返回
  };
}