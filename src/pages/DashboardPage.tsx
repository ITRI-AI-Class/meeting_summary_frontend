
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
  const { meetingSummaries, sortMeetingSummaries, fetchMeetingSummaries, deleteMeetingSummary } = useMeetingSummaries()!;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [selectedMeetingSummaries, setSelectedMeetingSummaries] = useState<string[]>([]);
  const { t, i18n } = useTranslation(); // 初始化語言切換

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await fetchMeetingSummaries();
        } catch (error) {
          console.error("Error fetching meeting summaries:", error);
        }
      }
    };

    fetchData();
  }, [fetchMeetingSummaries]); // 增加依賴 fetchMeetingSummaries，避免遺漏更新

  useEffect(() => {
    setSelectedMeetingSummaries([]);
  },[isSelectMode])

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
    var filteredMeetings = meetingSummaries;
    if (dateRange.startDate !== undefined && dateRange.endDate !== undefined) {
      filteredMeetings = filteredMeetings.filter(meetingSummary => {
        const meetingDate = new Date(meetingSummary.date); // 🔹 確保 `meetingSummary.date` 轉換為 `Date`
        return meetingDate >= dateRange.startDate! && meetingDate <= dateRange.endDate!;
      });
    }
    if (selectedTags.length !== 0) {
      filteredMeetings = filteredMeetings.filter((meetingSummary) =>
        selectedTags.some((tag) => meetingSummary.summary.tags.includes(tag))
      );
    }
    return filteredMeetings;
  }, [meetingSummaries, selectedTags, dateRange]);

  const handleSearch = (startDate: string, endDate: string) => {
    console.log(`Searching meetings from ${startDate} to ${endDate}`);

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // 🔹 設定結束日期為當天最後一秒，確保篩選完整一天

    setDateRange({startDate:start,endDate:end});
  };


  const handleDelete = () => {
    if (selectedMeetingSummaries.length > 0) {
      selectedMeetingSummaries.map(async (id) => {
        await deleteMeetingSummary(id);
      })
    }
  }

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
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <MeetingSelectionProvider>
      {filteredMeetings.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center text-center pt-[30vh]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {t("no_meetings_title", "No meetings found")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t("no_meetings_description")}
          </p>
          <div className="flex gap-x-2">
          <button
            onClick={() => navigate("/dashboard/upload")}
            className="mt-4 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            {t("upload_meeting")}
          </button>
          <button
            onClick={() => navigate("/dashboard/meeting")}
            className="mt-4 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            {t("new_meeting")}
          </button>
          </div>
        </div>
      )}
      </MeetingSelectionProvider>
    </div>
  );
}
