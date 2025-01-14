import { File, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingDialog from '../components/common/LoadingDialog';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { summarizeWithAudioFile } from '../services/api';
import { MeetingSummaryApiResponse } from '../types/meetingSummaries';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export function UploadPage() {
  const showNotification = () => {
    toast.success('會議總結已完成!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const showNotificationError = () => {
    toast.error('上傳失敗!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addMeetingSummary } = useMeetingSummaries()!;

  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
    setIsLoading(true);
    if (file && user) {
      try {
        const result: MeetingSummaryApiResponse = await summarizeWithAudioFile(user.id, file);
        // 你可以在這裡處理API回傳的結果，比如顯示總結
        console.log('Summarize result:', result);
        addMeetingSummary(result.data);
        showNotification();
        setIsLoading(false);
        navigate(`/dashboard/meeting/${result.data.id}`);
      } catch (error) {
        setIsLoading(false);
        showNotificationError();
        console.error('Failed to upload the file:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Meeting Recording</h1>

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12
          flex flex-col items-center justify-center
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
          transition-colors
          hover:text-indigo-500 cursor-pointer
        `}
      >
        <Upload className="w-12 h-12 text-gray-400 mb-4" />

        <div className="text-gray-600 text-center mb-4">
          Drag and drop your video file here, or{' '}
          <div className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
            browse
          </div>
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
        onClick={handleUploadClick}  // 新增的事件處理器
        disabled={!file}
        className={`
          mt-6 w-full py-3 px-4 rounded-lg
          flex items-center justify-center space-x-2
          ${file
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
          transition-colors
        `}
      >
        <Upload className="w-5 h-5" />
        <span>Upload Recording</span>
      </button>
      <LoadingDialog isVisible={isLoading} />
    </div>
  );
}