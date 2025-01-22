import React, { createContext, useContext, useState, useCallback } from 'react';
import { MeetingSummary, MeetingSummaryApiResponse } from '../types/meetingSummary';
import FirestoreService from '../services/FirestoreService';
import AIService from '../services/AIService';

interface MeetingSummariesContextType {
    meetingSummaries: MeetingSummary[];
    addMeetingSummary: (meetingSummary: MeetingSummary) => void;
    sortMeetingSummaries: (direction: 'asc' | 'desc') => void;
    summarizeMeeting: (uid: string, file: File | undefined, s3FileName: string | undefined) => Promise<MeetingSummaryApiResponse>;
    fetchMeetingSummaries: (uid: string) => Promise<void>;
}

const MeetingSummariesContext = createContext<MeetingSummariesContextType | undefined>(undefined);


export function MeetingSummariesProvider({ children }: { children: React.ReactNode }) {
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
        setMeetingSummaries(prev => {
            const updatedSummaries = [...prev, newMeeting];
            return updatedSummaries;
        });
    }, []);

    const summarizeMeeting = useCallback(async (uid: string, file: File|undefined, s3FileName: string|undefined) => {
        const formData = new FormData();
        formData.append('uid', uid);
        if(file){
            formData.append('file', file);
        }
        if(s3FileName){
            formData.append('s3_file_name', s3FileName);
        }
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
            setMeetingSummaries(data);
        } catch (error) {
            console.error("Error fetching meeting summaries:", error);
        }
    }, []);

    return (
        <MeetingSummariesContext.Provider
            value={{
                meetingSummaries,
                addMeetingSummary,
                sortMeetingSummaries,
                summarizeMeeting,
                fetchMeetingSummaries,
            }}
        >
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
