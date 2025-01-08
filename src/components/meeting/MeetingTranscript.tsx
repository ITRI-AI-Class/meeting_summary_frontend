import { Segment } from '../../types/meetingSummaries';

interface MeetingTranscriptProps {
  segments: Segment[];
  onSegmentClick?: (startTime: number) => void;
}

export function MeetingTranscript({ 
  segments,
  onSegmentClick 
}: MeetingTranscriptProps) {
  return (
    <div className="space-y-4">
      {segments.map((segment, index) => (
        <div 
          key={index}
          onClick={() => onSegmentClick?.(segment.startTime)}
          className="p-3 hover:bg-gray-50 rounded cursor-pointer"
        >
          <div className="text-sm text-gray-500 mb-1">
            {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
          </div>
          <p className="text-gray-700">{segment.text}</p>
        </div>
      ))}
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}