import React from 'react';
import { Play } from 'lucide-react';

interface MeetingCardThumbnailProps {
  thumbnailUrl?: string;
  duration?: string;
}

export function MeetingCardThumbnail({ thumbnailUrl, duration }: MeetingCardThumbnailProps) {
  return (
    <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
      {thumbnailUrl ? (
        <img 
          src={thumbnailUrl} 
          alt="Meeting thumbnail" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <Play className="w-12 h-12 text-gray-400" />
        </div>
      )}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      )}
    </div>
  );
}