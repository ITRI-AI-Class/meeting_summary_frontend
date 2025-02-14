import { Clock, RefreshCcw, Tag, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import AudioPlayer, { AudioPlayerRef } from '../components/meeting/AudioPlayer';
import { MeetingTranscript } from '../components/meeting/MeetingTranscript';
import { MeetingSummary } from '../types/meetingSummary';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation
import { Dialog } from '../components/common/Dialog';
import { DeleteButton } from '../components/common/DeleteButton';
import { LoadingDialog } from '../components/common/LoadingDialog';

export function MeetingSummaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const [loadingDots, setLoadingDots] = useState('.'); // 用於管理動畫中的點
  const { isLoading, meetingSummaries, deleteMeetingSummary, summarizeMeeting } = useMeetingSummaries()!;
  const [meetingSummary, setMeetingSummary] = useState<MeetingSummary | null>(null);
  const { t } = useTranslation(); // 使用 i18n 的翻譯功能
  const [dialog, setDialog] = useState({ "open": false, "message": "", "confirm": () => { } });

  const handleOpenDialog = (message: string, handleConfirm: () => void) => setDialog({ "open": true, "message": message, "confirm": handleConfirm });
  const handleCloseDialog = () => setDialog({ "open": false, "message": "", "confirm": () => { } });
  useEffect(() => {
    console.log(id);
    console.log(meetingSummaries);
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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);
    } else {
      setLoadingDots(''); // 重置為單點
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (!meetingSummary) {
    return "Loading...";
  }
  // In a real app, this would come from an API
  const handleSegmentClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(startTime);
      audioPlayerRef.current.play();
    }
  };

  const handleDeleteButtonClick = () => {
    handleOpenDialog(t('confirmDelete'), handleDelete);
  }

  const handleDelete = async () => {
    var result = await deleteMeetingSummary(meetingSummary.id);
    if (result) {
      navigate(-1);
      handleCloseDialog();
    }
  }

  const handleRegenerate = async () => {
    var s3FileName = meetingSummary.srcUrl.split('/').pop();
    console.log(s3FileName);
    var result = await summarizeMeeting({ s3FileName: s3FileName, summaryId: meetingSummary.id });
    if (result) {
      handleCloseDialog();
    }
  }

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{meetingSummary.summary.title}</h1>

        <div className='flex justify-between mb-6'>
          <div className="flex items-center space-x-4">
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
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleOpenDialog(t('confirmRegenerate'), handleRegenerate)}
              className="
              px-2.5 py-1.5 rounded-md border
              bg-white border-gray-300
              text-gray-600 dark:text-gray-400 
              hover:bg-gray-50 dark:hover:bg-gray-900/50
            "
              title={t('regenerateMeetings')}
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <DeleteButton
              title={t('deleteMeetings')}
              onDelete={handleDeleteButtonClick}
            />
          </div>
        </div>

        {meetingSummary.srcUrl.endsWith('.mp4') ? (
          <div className="bg-black aspect-video rounded-lg mb-8">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg"
              controls
              poster={meetingSummary.thumbnailUrl}
              src={meetingSummary.srcUrl}
            />
          </div>
        ) : null}

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

        {meetingSummary.srcUrl.endsWith('.mp3') ? (
          <div className="bottom-0 w-full left-0 mt-8">
            <AudioPlayer
              ref={audioPlayerRef}
              src={meetingSummary.srcUrl}
            />
          </div>
        ) : null}
      </div>
      {dialog.open && (
        <Dialog
          message={dialog.message}
          onClose={handleCloseDialog}
          onConfirm={dialog.confirm}
        />
      )}
      {
        isLoading && <LoadingDialog message={t('uploadingAndGenerating') + loadingDots} />
      }
    </div>
  );
}