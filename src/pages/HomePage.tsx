import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Video } from 'lucide-react';
import { MeetingCard } from '../components/meeting/MeetingCard';
import { Button } from '../components/common/Button';
import { DateSearch } from '../components/meeting/DateSearch';
import { MeetingControls } from '../components/meeting/MeetingControls';
import { Meeting } from '../types/meeting';
import { useMeetings } from '../hooks/useMeetings';

export function HomePage() {
  const navigate = useNavigate();
  const { meetings, sortMeetings } = useMeetings();
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMeetings, setSelectedMeetings] = useState<number[]>([]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    meetings.forEach(meeting => meeting.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [meetings]);

  const filteredMeetings = useMemo(() => {
    if (selectedTags.length === 0) return meetings;
    return meetings.filter(meeting =>
      selectedTags.some(tag => meeting.tags.includes(tag))
    );
  }, [meetings, selectedTags]);

  const handleNewMeeting = () => {
    navigate('/meeting/new');
  };

  const handleSearch = (startDate: string, endDate: string) => {
    // Filter meetings by date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate >= start && meetingDate <= end;
    });
    // Update filtered meetings
  };

  const handleSort = (direction: 'asc' | 'desc') => {
    sortMeetings(direction);
  };

  const handleMeetingClick = (meeting: Meeting) => {
    if (isSelectMode) {
      setSelectedMeetings(prev =>
        prev.includes(meeting.id)
          ? prev.filter(id => id !== meeting.id)
          : [...prev, meeting.id]
      );
    } else {
      navigate(`/meeting/${meeting.id}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Meeting Records</h1>
          <div className="flex space-x-4">
            <Button to="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Upload Meeting
            </Button>
            <Button onClick={handleNewMeeting} variant="primary">
              <Video className="w-5 h-5 mr-2" />
              New Meeting
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <DateSearch onSearch={handleSearch} />
          <MeetingControls
            onSort={handleSort}
            onSelectMode={setIsSelectMode}
            selectedTags={selectedTags}
            availableTags={availableTags}
            onTagsChange={setSelectedTags}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onClick={() => handleMeetingClick(meeting)}
            isSelected={selectedMeetings.includes(meeting.id)}
            showCheckbox={isSelectMode}
          />
        ))}
      </div>
    </div>
  );
}