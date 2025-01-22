import { Upload, Video } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DateSearch } from '../components/meeting/DateSearch';
import { MeetingCard } from '../components/meeting/MeetingCard';
import { MeetingControls } from '../components/meeting/MeetingControls';
import { MeetingSelectionProvider } from '../components/meeting/MeetingSelectionContext.tsx'; // Import the provider and hook
import { useAuth } from '../contexts/AuthContext.tsx';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext.tsx';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { meetingSummaries, sortMeetingSummaries, fetchMeetingSummaries } = useMeetingSummaries()!;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMeetingSummaries, setSelectedMeetingSummaries] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await fetchMeetingSummaries(user.id);
        } catch (error) {
          console.error("Error fetching meeting summaries:", error);
        }
      }
    };

    fetchData();
  }, [user, fetchMeetingSummaries]); // 增加依賴 fetchMeetingSummaries，避免遺漏更新

  const toggleSelection = (meetingId: string) => {
    setSelectedMeetingSummaries((prev) =>
      prev.includes(meetingId)
        ? prev.filter((id) => id !== meetingId) // 取消選中
        : [...prev, meetingId] // 新增選中
    );
  };

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    meetingSummaries.forEach(meetingSummary => meetingSummary.summary.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [meetingSummaries]);

  const filteredMeetings = useMemo(() => {
    console.log(meetingSummaries);
    if (selectedTags.length === 0) return meetingSummaries;
    return meetingSummaries.filter(meetingSummary =>
      selectedTags.some(tag => meetingSummary.summary.tags.includes(tag))
    );
  }, [meetingSummaries, selectedTags]);

  const handleNewMeeting = () => {
    navigate('/dashboard/meeting');
  };

  const handleSearch = (startDate: string, endDate: string) => {
    // Filter meetings by date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = meetingSummaries.filter(meetingSummary => {
      const meetingDate = new Date(meetingSummary.date);
      return meetingDate >= start && meetingDate <= end;
    });
    // Update filtered meetings
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meeting Notes</h1>
          <div className="flex space-x-4">
            <Button to="/dashboard/upload">
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
            onSort={(direction) => sortMeetingSummaries(direction)}
            onSelectMode={setIsSelectMode}
            selectedTags={selectedTags}
            availableTags={availableTags}
            onTagsChange={setSelectedTags}
          />
        </div>
      </div>

      <MeetingSelectionProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meetingSummary) => (
            <MeetingCard
              key={meetingSummary.id}
              meetingSummary={meetingSummary}
              onClick={() => navigate(`/dashboard/meetingSummary/${meetingSummary.id}`)}
              isSelected={selectedMeetingSummaries.includes(meetingSummary.id)}
              showCheckbox={isSelectMode}
              toggleSelection={() => toggleSelection(meetingSummary.id)}
            />
          ))}
        </div>
      </MeetingSelectionProvider>
    </div>
  );
}
