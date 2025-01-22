import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { MeetingSummary } from '../../types/meetingSummary';
import { MeetingCardThumbnail } from './MeetingCardThumbnail';

interface MeetingCardProps {
  meetingSummary: MeetingSummary;
  onClick: () => void;
  isSelected: boolean;
  toggleSelection: () => void; // 用於切換選中狀態
  showCheckbox?: boolean;
}

export function MeetingCard({
  meetingSummary,
  onClick,
  isSelected,
  toggleSelection,
  showCheckbox,
}: MeetingCardProps) {
  const handleCheckboxClick = (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation(); // 阻止冒泡，避免觸發父容器的 onClick
    toggleSelection(); // 切換選中狀態
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      }`}
    >
      <MeetingCardThumbnail
        thumbnailUrl={meetingSummary.thumbnailUrl}
        duration={meetingSummary.transcription.duration}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {meetingSummary.summary.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {meetingSummary.summary.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <time>{new Date(meetingSummary.date).toLocaleDateString()}</time>
        </div>
      </div>

      {showCheckbox && (
        <div
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 shadow-sm"
          onClick={handleCheckboxClick} // 將點擊事件分離
        >
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
              isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
            }`}
          >
            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
          </div>
        </div>
      )}
    </div>
  );
}
