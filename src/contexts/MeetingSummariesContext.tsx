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
    fetchMeetingSummaries: () => Promise<void>;
    deleteMeetingSummary: (id: string) => Promise<boolean>;
    downloadMeetingSummary: (id: string) => Promise<boolean>;
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

    const summarizeMeeting = useCallback(async (data: MeetingSummariesApiDataProps) => {
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
            if (data.summaryId) {
                formData.append('summary_id', data.summaryId);
            }
            try {
                const response = await MeetingSummaryService.summarize(formData);
                addMeetingSummary(response.data.summary);
                return response.data;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
    }, [user])

    const fetchMeetingSummaries = useCallback(async () => {
        if (user) {
            try {
                const data = await FirestoreService.fetchMeetingSummariesData(user.id);
                setMeetingSummaries(data);
            } catch (error) {
                console.error("Error fetching meeting summaries:", error);
            }
        }
    }, [user]);

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
            } finally {
                setIsLoading(false);
            }
        } else {
            return false;
        }
    }, [user]);

    const downloadMeetingSummary = useCallback(async (id: string) => {
        if (user) {
            try {
                setIsLoading(true);
                const response = await MeetingSummaryService.downloadSummary(user.id, id);
                if (response.status === 200) {
                    // 獲取檔案的 blob
                     // **解析 Content-Disposition**
                    const disposition = response.headers.get("Content-Disposition");
                    console.log(response);
                    let filename = "downloaded_file.zip"; // 預設檔名
                    console.log(disposition);
                    if (disposition && disposition.includes("filename=")) {
                        console.log(disposition);
                        const matches = disposition.match(/filename\*=utf-8''(.+)/);
                        if (matches && matches.length > 1) {
                            filename = decodeURIComponent(matches[1]); // 解析 URL 編碼
                        } else {
                            const fallbackMatch = disposition.match(/filename="(.+)"/);
                            if (fallbackMatch && fallbackMatch.length > 1) {
                            filename = fallbackMatch[1];
                            }
                        }
                    }
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const a = document.createElement("a");
                    a.href = url;
                    console.log(url);
                    a.download = filename; 
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error delete file:', error);
                throw error;
            } finally {
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
                downloadMeetingSummary,
            }}
        >
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
