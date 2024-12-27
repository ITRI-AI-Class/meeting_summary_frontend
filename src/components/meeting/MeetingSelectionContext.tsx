import React, { createContext, useContext, useState } from 'react';

interface MeetingSelectionContextType {
  isSelectMode: boolean;
  selectedMeetings: number[];
  toggleSelectMode: () => void;
  toggleMeetingSelection: (meetingId: number) => void;
  clearSelection: () => void;
}

const MeetingSelectionContext = createContext<MeetingSelectionContextType | null>(null);

export function MeetingSelectionProvider({ children }: { children: React.ReactNode }) {
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMeetings, setSelectedMeetings] = useState<number[]>([]);

  const toggleSelectMode = () => {
    setIsSelectMode(prev => !prev);
    if (isSelectMode) {
      setSelectedMeetings([]);
    }
  };

  const toggleMeetingSelection = (meetingId: number) => {
    setSelectedMeetings(prev =>
      prev.includes(meetingId)
        ? prev.filter(id => id !== meetingId)
        : [...prev, meetingId]
    );
  };

  const clearSelection = () => {
    setSelectedMeetings([]);
  };

  return (
    <MeetingSelectionContext.Provider
      value={{
        isSelectMode,
        selectedMeetings,
        toggleSelectMode,
        toggleMeetingSelection,
        clearSelection
      }}
    >
      {children}
    </MeetingSelectionContext.Provider>
  );
}

export function useMeetingSelection() {
  const context = useContext(MeetingSelectionContext);
  if (!context) {
    throw new Error('useMeetingSelection must be used within a MeetingSelectionProvider');
  }
  return context;
}