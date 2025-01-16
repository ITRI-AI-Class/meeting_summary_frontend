import { Clock, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/meeting/AudioPlayer';
import { MeetingTranscript } from '../components/meeting/MeetingTranscript';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { MeetingSummary } from '../types/meetingSummaries';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation

export function MeetingDetailsPage() {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { meetingSummaries } = useMeetingSummaries()!;
  const [meetingSummary, setMeetingSummary] = useState<MeetingSummary | null>(null);
  const { t } = useTranslation(); // 使用 i18n 的翻譯功能
  useEffect(() => {
    const foundMeeting = meetingSummaries.find(meeting => meeting.id === id);
    if (foundMeeting) {
      setMeetingSummary(foundMeeting);
    } else {
      // 若找不到會議紀錄，稍後重新檢查
      const interval = setInterval(() => {
        const refreshedMeeting = meetingSummaries.find(meeting => meeting.id === id);
        if (refreshedMeeting) {
          setMeetingSummary(refreshedMeeting);
          clearInterval(interval);
        }
      }, 500);
    }
  }, [id, meetingSummaries]);

  if (!meetingSummary) {
    return <div>Loading...</div>;
  }
  // In a real app, this would come from an API
  const handleSegmentClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{meetingSummary.summary.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {new Date(meetingSummary.date).toLocaleString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-600" />
            <div className="flex gap-2">
              {meetingSummary.summary.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="bg-black aspect-video rounded-lg mb-8">
        {meetingSummary.videoUrl ? (
          <video
            ref={videoRef}
            className="w-full h-full rounded-lg"
            controls
            poster={meetingSummary.thumbnailUrl}
            src={meetingSummary.videoUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            No video available
          </div>
        )}
      </div> */}

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('Summary')}</h2>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {meetingSummary.summary.content}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('Transcript')}</h2>
            <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <MeetingTranscript
                segments={meetingSummary.transcription.segments}
                onSegmentClick={handleSegmentClick}
              />
            </div>
          </section>
        </div>
        <div className="bottom-0 w-full left-0 mt-8">
        <AudioPlayer src="../../sample_01.mp3" />
      </div>
      </div>
    </div>
  );
}