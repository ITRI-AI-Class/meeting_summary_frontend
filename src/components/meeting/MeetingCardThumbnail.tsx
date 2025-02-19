import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface MeetingCardThumbnailProps {
  thumbnailUrl?: string;
  duration?: number;
}

export function MeetingCardThumbnail({ thumbnailUrl, duration }: MeetingCardThumbnailProps) {
  const [imgSrc, setImgSrc] = useState(thumbnailUrl);
  return (
    <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
      {imgSrc ? (
        <img 
          src={imgSrc} 
          alt="Meeting thumbnail" 
          className="w-full h-full object-cover dark:bg-gray-400"
          onError={() => setImgSrc(undefined)}
        />
      ) : (
        <div className="flex items-center justify-center h-full dark:bg-gray-400">
          <Play className="w-12 h-12 text-gray-400 dark:text-gray-400" />
        </div>
      )}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded dark:bg-gray-800 dark:bg-opacity-70">
          {formatDuration(duration)}
        </div>
      )}
    </div>
  );
}

function formatDuration(seconds: number): string {
  // 取整秒數，捨去任何小數部分（即把它轉換為整數）
  const roundedSeconds = Math.floor(seconds);

  // 取得分鐘數和剩餘的秒數
  const minutes = Math.floor(roundedSeconds / 60); // 取分鐘
  const remainingSeconds = roundedSeconds % 60; // 取秒數

  // 格式化為 mm:ss，保證兩位數
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
