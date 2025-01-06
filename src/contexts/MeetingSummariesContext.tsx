import React, { createContext, useContext, useState, useCallback } from 'react';
import { MeetingSummary } from '../types/meetingSummaries';

interface MeetingSummariesContextType {
    meetingSummaries: MeetingSummary[];
    addMeetingSummary: (newMeeting: MeetingSummary) => void;
    sortMeetingSummaries: (direction: 'asc' | 'desc') => void;
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

    const addMeetingSummary = useCallback((newMeeting: MeetingSummary) => {
        setMeetingSummaries(prev => [...prev, newMeeting]);
    }, []);

    return (
        <MeetingSummariesContext.Provider value={{ meetingSummaries, addMeetingSummary, sortMeetingSummaries }}>
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
