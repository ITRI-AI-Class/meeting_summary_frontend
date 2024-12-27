import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { Meeting, MeetingSegment } from '../types/meeting';
import { MeetingTranscript } from '../components/meeting/MeetingTranscript';

// In a real app, this would come from an API
const getMeetingDetails = (id: string): Meeting & { segments: MeetingSegment[] } => ({
  id: parseInt(id),
  title: "Q1 2024 Planning Session",
  date: "Mar 15, 2024",
  tags: ["Planning", "Strategy"],
  // Using a real sample video from the web
  videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
  duration: "1:30:00",
  summary: "Quarterly planning session discussing Q1 2024 objectives, key results, and strategic initiatives.",
  transcript: "Meeting transcript would appear here...",
  segments: [
    {
      startTime: 0,
      endTime: 180,
      text: "Introduction and agenda overview",
      summary: "Meeting kickoff and outline of topics"
    },
    {
      startTime: 180,
      endTime: 600,
      text: "Q4 2023 review and lessons learned",
      summary: "Discussion of previous quarter results"
    }
  ]
});

export function MeetingDetailsPage() {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const meeting = getMeetingDetails(id!);

  const handleSegmentClick = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{meeting.title}</h1>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-600" />
          <div className="flex gap-2">
            {meeting.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black aspect-video rounded-lg mb-8">
        {meeting.videoUrl ? (
          <video 
            ref={videoRef}
            className="w-full h-full rounded-lg"
            controls
            poster={meeting.thumbnailUrl}
            src={meeting.videoUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            No video available
          </div>
        )}
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Summary</h2>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
            {meeting.summary}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Transcript</h2>
          <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
            <MeetingTranscript 
              transcript={meeting.transcript}
              segments={meeting.segments}
              onSegmentClick={handleSegmentClick}
            />
          </div>
        </section>
      </div>
    </div>
  );
}