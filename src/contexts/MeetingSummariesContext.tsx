import React, { createContext, useContext, useState, useCallback } from 'react';
import { MeetingSummary } from '../types/meetingSummaries';

interface MeetingSummariesContextType {
    meetingSummaries: MeetingSummary[];
    addMeetingSummary: (newMeeting: MeetingSummary) => void;
}

const MeetingSummariesContext = createContext<MeetingSummariesContextType | undefined>(undefined);


export function MeetingSummariesProvider({ children }: { children: React.ReactNode }) {
    const [meetingSummaries, setMeetingSummaries] = useState<MeetingSummary[]>([]);

    const addMeetingSummary = useCallback((newMeeting: MeetingSummary) => {
        setMeetingSummaries(prev => [...prev, newMeeting]);
    }, []);

    return (
        <MeetingSummariesContext.Provider value={{ meetingSummaries, addMeetingSummary }}>
            {children}
        </MeetingSummariesContext.Provider>
    );
};

export const useMeetingSummaries = () => {
    return useContext(MeetingSummariesContext);
};
