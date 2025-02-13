import React, { createContext, useContext, useState, useCallback } from 'react';
import { MeetingSummary, MeetingSummaryApiResponse } from '../types/meetingSummary';
import FirestoreService from '../services/FirestoreService';
import MeetingSummaryService from '../services/MeetingSummaryService';
import { useAuth } from './AuthContext';

interface MeetingSummariesContextType {
    meetingSummaries: MeetingSummary[];
    addMeetingSummary: (meetingSummary: MeetingSummary) => void;
    sortMeetingSummaries: (direction: 'asc' | 'desc') => void;
    summarizeMeeting: (file: File | undefined, s3FileName: string | undefined) => Promise<MeetingSummaryApiResponse | undefined>;
    fetchMeetingSummaries: (uid: string) => Promise<void>;
    deleteMeetingSummary: (id: string) => Promise<void>;
    refreshMeetingSummaries: (summaries: MeetingSummary[]) => void; // 新增 refreshMeetingSummaries
}

const MeetingSummariesContext = createContext<MeetingSummariesContextType | undefined>(undefined);


export function MeetingSummariesProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
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

    const summarizeMeeting = useCallback(async (file: File | undefined, s3FileName: string | undefined) => {
        if (user) {
            const formData = new FormData();
            formData.append('uid', user.id);
            if (file) {
                formData.append('file', file);
            }
            if (s3FileName) {
                formData.append('s3_file_name', s3FileName);
            }
            try {
                const response = await MeetingSummaryService.summarize(formData);
                addMeetingSummary(response.data.summary);
                return response.data;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
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

    const deleteMeetingSummary = useCallback(async (id: string) => {
        if(user){
            try {
                const response = await MeetingSummaryService.deleteSummary(user.id, id);
                if(response.status === 200){
                    setMeetingSummaries(prev => {
                        var updatedSummaries = prev.filter(summary => summary.id !== id);
                        return updatedSummaries;
                    });      
                }else{
                }
            }catch (error) {
                console.error('Error delete file:', error);
                throw error;
            }
        }
    }, [user]);

    // **新增 refreshMeetingSummaries 方法**
    const refreshMeetingSummaries = useCallback((summaries: MeetingSummary[]) => {
        setMeetingSummaries(summaries);
    }, []);
    return (
        <MeetingSummariesContext.Provider
            value={{
                meetingSummaries,
                addMeetingSummary,
                sortMeetingSummaries,
                summarizeMeeting,
                fetchMeetingSummaries,
                deleteMeetingSummary,
                refreshMeetingSummaries, // 新增 refreshMeetingSummaries
            }}
        >
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
