import React, { createContext, useContext, useState, useCallback } from 'react';
import { MeetingSummary, MeetingSummaryApiResponse } from '../types/meetingSummary';
import FirestoreService from '../services/FirestoreService';
import MeetingSummaryService from '../services/MeetingSummaryService';
import { useAuth } from './AuthContext';

interface MeetingSummariesApiDataProps {
    file?: File;
    s3FileName?: string;
    summaryId?: string;
}

interface MeetingSummariesContextType {
    isLoading: boolean;
    meetingSummaries: MeetingSummary[];
    addMeetingSummary: (meetingSummary: MeetingSummary) => void;
    sortMeetingSummaries: (direction: 'asc' | 'desc') => void;
    summarizeMeeting: (data: MeetingSummariesApiDataProps) => Promise<MeetingSummaryApiResponse | undefined>;
    fetchMeetingSummaries: (uid: string) => Promise<void>;
    deleteMeetingSummary: (id: string) => Promise<boolean>;
}

const MeetingSummariesContext = createContext<MeetingSummariesContextType | undefined>(undefined);


export function MeetingSummariesProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [meetingSummaries, setMeetingSummaries] = useState<MeetingSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            /// 排除已存在的meeting
            var filterPrev = prev.filter(summary => summary.id !== newMeeting.id)
            const updatedSummaries = [...filterPrev, newMeeting];
            return updatedSummaries;
        });
    }, []);

    const summarizeMeeting = useCallback(async (data:MeetingSummariesApiDataProps) => {
        console.log(user);
        if (user) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('uid', user.id);
            if (data.file) {
                formData.append('file', data.file);
            }
            if (data.s3FileName) {
                formData.append('s3_file_name', data.s3FileName);
            }
            if(data.summaryId){
                formData.append('summary_id', data.summaryId);
            }
            try {
                const response = await MeetingSummaryService.summarize(formData);
                addMeetingSummary(response.data.summary);
                return response.data;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }finally{
                setIsLoading(false);
            }
        }
    }, [user])

    const fetchMeetingSummaries = useCallback(async (uid: string) => {
        try {
            const data = await FirestoreService.fetchMeetingSummariesData(uid);
            setMeetingSummaries(data);
        } catch (error) {
            console.error("Error fetching meeting summaries:", error);
        }
    }, []);

    const deleteMeetingSummary = useCallback(async (id: string) => {
        if (user) {
            try {
                setIsLoading(true);
                const response = await MeetingSummaryService.deleteSummary(user.id, id);
                if (response.status === 200) {
                    setMeetingSummaries(prev => {
                        var updatedSummaries = prev.filter(summary => summary.id !== id);
                        return updatedSummaries;
                    });
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error delete file:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        } else {
            return false;
        }
    }, [user]);

    return (
        <MeetingSummariesContext.Provider
            value={{
                isLoading,
                meetingSummaries,
                addMeetingSummary,
                sortMeetingSummaries,
                summarizeMeeting,
                fetchMeetingSummaries,
                deleteMeetingSummary,
            }}
        >
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
