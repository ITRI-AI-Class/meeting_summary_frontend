import { useState, useCallback } from 'react';
import { MeetingSummary } from '../types/meetingSummary';
import AIService from '../services/AIService';
import FirestoreService from '../services/FirestoreService';

export default function useMeetingSummaries() {
  const [meetingSummaries, setMeetingSummaries] = useState<MeetingSummary[]>([]);

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

  const summarizeMeeting = useCallback(async (uid: string, file: File) => {
    const formData = new FormData();
    formData.append('uid', uid);
    formData.append('file', file);
    try {
      const response = await AIService.summarize(formData);
      addMeetingSummary(response.data.summary);
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }, [])

  const fetchMeetingSummaries = useCallback(async (uid: string) => {
    try {
      const data = await FirestoreService.fetchMeetingSummariesData(uid);
      console.log('Meeting Summaries2:', data);
      setMeetingSummaries(data);
    } catch (error) {
      console.error("Error fetching meeting summaries:", error);
    }
  }, []);

  return {
    meetingSummaries,
    sortMeetingSummaries,
    addMeetingSummary, // 將新增方法返回
    fetchMeetingSummaries,
    summarizeMeeting,
  };
}