import React from 'react';
import { VideoWindow } from './VideoWindow';
import { Participant } from '../../../types/meetingRecording';

interface VideoGridProps {
  participants: Participant[];
  localStream?: MediaStream;
}

export function VideoGrid({ participants, localStream }: VideoGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {localStream && (
        <VideoWindow
          stream={localStream}
          name="You"
          isSelf={true}
        />
      )}
      {participants.map(participant => (
        <VideoWindow
          key={participant.id}
          stream={participant.stream}
          name={participant.name}
          isMuted={participant.isMuted}
        />
      ))}
    </div>
  );
}