
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next"; // 引入語言切換
import { useNavigate } from "react-router-dom";
import { DateSearch } from "../components/meeting/DateSearch";
import { MeetingCard } from "../components/meeting/MeetingCard";
import { MeetingControls } from "../components/meeting/MeetingControls";
import { MeetingSelectionProvider } from "../components/meeting/MeetingSelectionContext.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useMeetingSummaries } from "../contexts/MeetingSummariesContext.tsx";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { meetingSummaries, sortMeetingSummaries, fetchMeetingSummaries } = useMeetingSummaries()!;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMeetingSummaries, setSelectedMeetingSummaries] = useState<string[]>([]);
  const { t, i18n } = useTranslation(); // 初始化語言切換

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
        ? prev.filter((id) => id !== meetingId)
        : [...prev, meetingId]
    );
  };

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    meetingSummaries.forEach((meetingSummary) =>
      meetingSummary.summary.tags.forEach((tag) => tags.add(tag))
    );
    return Array.from(tags);
  }, [meetingSummaries]);

  const filteredMeetings = useMemo(() => {
    console.log(meetingSummaries);
    if (selectedTags.length === 0) return meetingSummaries;
    return meetingSummaries.filter((meetingSummary) =>
      selectedTags.some((tag) => meetingSummary.summary.tags.includes(tag))
    );
  }, [meetingSummaries, selectedTags]);

  const handleSearch = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = meetingSummaries.filter((meetingSummary) => {
      const meetingDate = new Date(meetingSummary.date);
      return meetingDate >= start && meetingDate <= end;
    });
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("meeting_notes")}
            </h1>
          </div>
          <div className="flex items-center justify-start space-x-4">
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
