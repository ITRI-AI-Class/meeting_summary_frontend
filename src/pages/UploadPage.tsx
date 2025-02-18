import { File, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation
import { LoadingDialog } from '../components/common/LoadingDialog';

export function UploadPage() {
  const { t } = useTranslation(); // 使用 i18n 的翻譯功能
  const [loadingDots, setLoadingDots] = useState('.'); // 用於管理動畫中的點
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoading, summarizeMeeting } = useMeetingSummaries()!;
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const showNotification = () => {
    toast.success(t('upload_meeting_Btn.successNotification'), { // 使用翻譯鍵
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showNotificationError = () => {
    toast.error(t('upload_meeting_Btn.errorNotification'), { // 使用翻譯鍵
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUploadClick = async () => {
    if (file && user) {
      try {
        const result = await summarizeMeeting({file:file});
        console.log(result);
        if(result === undefined) {
          showNotificationError();
        }else{
          showNotification();
          navigate(`/dashboard/meetingSummary/${result.summary.id}`);
        }
      } catch (error) {
        showNotificationError();
        console.error('Failed to upload the file:', error);
      }
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('upload_meeting_Btn.uploadMeetingRecording')}</h1>

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12
          flex flex-col items-center justify-center
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 dark:border-gray-600'}
          transition-colors
          hover:text-indigo-500 cursor-pointer
        `}
      >
        <Upload className="w-12 h-12 text-gray-400 mb-4" />

        <div className="text-gray-600 dark:text-gray-400 text-center mb-4">
          {t('upload_meeting_Btn.dragAndDrop')}
        </div>

        {file && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <File className="w-4 h-4" />
            <span>{file.name}</span>
          </div>
        )}

        <input
          type="file"
          accept="video/audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        onClick={handleUploadClick}
        disabled={!file}
        className={`
          mt-6 w-full py-3 px-4 rounded-lg
          flex items-center justify-center space-x-2
          ${file
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }
          transition-colors
        `}
      >
        <Upload className="w-5 h-5" />
        <span>{t('upload_meeting_Btn.uploadRecording')}</span>
      </button>
      {
        isLoading && <LoadingDialog message={t('uploadingAndGenerating') + loadingDots} />
      }
    </div>
  );
}
