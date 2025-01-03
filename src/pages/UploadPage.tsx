import React, { useState } from 'react';
import { Upload, File } from 'lucide-react';
import { summarizeWithAudioFile } from '../services/api';
import LoadingDialog from '../components/common/LoadingDialog';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { MeetingSummaryApiResponse, MeetingSummaryStatus } from '../types/meetingSummaries';

export function UploadPage() {
  const navigate = useNavigate();
  const { meetingSummaries,addMeetingSummary } = useMeetingSummaries()!;

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
    if (file) {
      try {
        const result: MeetingSummaryApiResponse = await summarizeWithAudioFile(file);
        // 你可以在這裡處理API回傳的結果，比如顯示總結
        console.log('Summarize result:', result);
        const id = uuidv4();
        addMeetingSummary({
          id: id,
          data: result,
          date: Date.now().toString(),
          duration: "1:00:00",
          thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
          status: MeetingSummaryStatus.Completed,
        });
        console.log('Meeting Summary ID:', id);
        setIsLoading(false);
        navigate(`/dashboard/meeting/${id}`);
      } catch (error) {
        setIsLoading(false);
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