import { Upload, Video } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DateSearch } from '../components/meeting/DateSearch';
import { MeetingCard } from '../components/meeting/MeetingCard';
import { MeetingControls } from '../components/meeting/MeetingControls';
import { MeetingSelectionProvider } from '../components/meeting/MeetingSelectionContext.tsx';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext.tsx';
import { fetchMeetingSummariesData } from '../services/firestore.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { meetingSummaries, sortMeetingSummaries, refreshMeetingSummaries } = useMeetingSummaries()!;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMeetingSummaries, setSelectedMeetingSummaries] = useState<string[]>([]);
  
  // 🔹 新增 `filteredMeetings` 狀態來更新 UI
  const [filteredMeetings, setFilteredMeetings] = useState(meetingSummaries);

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.id);
      const fetchData = async () => {
        try {
          const data = await fetchMeetingSummariesData(user.id);
          refreshMeetingSummaries(data); // 更新會議摘要
          setFilteredMeetings(data); // 🔹 更新搜尋結果
          console.log('Fetched meeting summaries:', data);
        } catch (error) {
          console.error("Error fetching meeting summaries:", error);
        }
      };
      fetchData();
    }
  }, [user, refreshMeetingSummaries]);

  const toggleSelection = (meetingId: string) => {
    setSelectedMeetingSummaries((prev) =>
      prev.includes(meetingId)
        ? prev.filter((id) => id !== meetingId) // 取消選中
        : [...prev, meetingId] // 新增選中
    );
  };

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    meetingSummaries.forEach(meetingSummary => 
      meetingSummary.summary.tags.forEach(tag => tags.add(tag))
    );
    return Array.from(tags);
  }, [meetingSummaries]);

  // 🔹 依標籤篩選會議
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredMeetings(meetingSummaries);
    } else {
      setFilteredMeetings(
        meetingSummaries.filter(meetingSummary =>
          selectedTags.some(tag => meetingSummary.summary.tags.includes(tag))
        )
      );
    }
  }, [meetingSummaries, selectedTags]);

  // 🔹 修正 `handleSearch`
  const handleSearch = (startDate: string, endDate: string) => {
    console.log(`Searching meetings from ${startDate} to ${endDate}`);

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // 🔹 設定結束日期為當天最後一秒，確保篩選完整一天

    const filtered = meetingSummaries.filter(meetingSummary => {
      const meetingDate = new Date(meetingSummary.date); // 🔹 確保 `meetingSummary.date` 轉換為 `Date`
      return meetingDate >= start && meetingDate <= end;
    });

    console.log("Filtered Meetings:", filtered);
    setFilteredMeetings(filtered); // 🔹 更新 `filteredMeetings`
  };

  const handleNewMeeting = () => {
    navigate('/dashboard/meeting/new');
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
              onClick={() => navigate(`/dashboard/meeting/${meetingSummary.id}`)}
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
