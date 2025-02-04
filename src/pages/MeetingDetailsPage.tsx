import { Clock, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer, { AudioPlayerRef } from '../components/meeting/AudioPlayer';
import { MeetingTranscript } from '../components/meeting/MeetingTranscript';
import { useMeetingSummaries } from '../contexts/MeetingSummariesContext';
import { MeetingSummary } from '../types/meetingSummaries';

export function MeetingDetailsPage() {
  const { id } = useParams();
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const { meetingSummaries, refreshMeetingSummaries } = useMeetingSummaries()!;
  const [meetingSummary, setMeetingSummary] = useState<MeetingSummary | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('meetingSummaries');
    if (storedData) {
      refreshMeetingSummaries(JSON.parse(storedData));
    }
  }, [refreshMeetingSummaries]);

  useEffect(() => {
    if (meetingSummaries.length > 0) {
      localStorage.setItem('meetingSummaries', JSON.stringify(meetingSummaries));
    }
  }, [meetingSummaries]);

  useEffect(() => {
    const foundMeeting = meetingSummaries.find(meeting => meeting.id === id);
    if (foundMeeting) {
      setMeetingSummary(foundMeeting);
    } else {
      const interval = setInterval(() => {
        const refreshedMeeting = meetingSummaries.find(meeting => meeting.id === id);
        if (refreshedMeeting) {
          setMeetingSummary(refreshedMeeting);
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [id, meetingSummaries]);

  if (!meetingSummary) {
    return <div>Loading...</div>;
  }

  const handleSegmentClick = (startTime: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(startTime);
      audioPlayerRef.current.play();
    }
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{meetingSummary.summary.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{meetingSummary.date}</span>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Summary</h2>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {meetingSummary.summary.content}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Transcript</h2>
            <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <MeetingTranscript
                segments={meetingSummary.transcription.segments}
                onSegmentClick={handleSegmentClick}
              />
            </div>
          </section>
        </div>

        <div className="bottom-0 w-full left-0 mt-8">
          <AudioPlayer 
            ref={audioPlayerRef}
            src="../../sample_01.mp3"  // Using the direct path that works
          />
        </div>
      </div>
    </div>
  );
}