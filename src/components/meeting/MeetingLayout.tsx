import React, { useState } from 'react';
import { VideoGrid } from './video/VideoGrid';
import { MediaControls } from './controls/MediaControls';
import { ChatPanel } from './features/ChatPanel';
import { PollPanel } from './features/PollPanel';
import { useMediaDevices } from '../../hooks/useMediaDevices';
import { Participant } from '../../types/meeting';

interface MeetingLayoutProps {
  meetingId: string;
  isHost: boolean;
}

export function MeetingLayout({ meetingId, isHost }: MeetingLayoutProps) {
  const [showChat, setShowChat] = useState(false);
  const [showPolls, setShowPolls] = useState(false);
  const { 
    stream: localStream,
    isMicOn,
    isCameraOn,
    toggleMic,
    toggleCamera
  } = useMediaDevices();

  // Sample participants - In a real app, this would come from WebRTC connections
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'John Doe',
      stream: new MediaStream(),
      isMuted: false,
      isVideoEnabled: true
    }
  ]);

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex flex-col">
        <VideoGrid 
          participants={participants}
          localStream={localStream}
        />
        
        <div className="bg-gray-800 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <MediaControls
              isMicOn={isMicOn}
              isCameraOn={isCameraOn}
              isSharing={false}
              onToggleMic={toggleMic}
              onToggleCamera={toggleCamera}
              onToggleShare={() => {}}
            />
          </div>
        </div>
      </div>

      {showChat && <ChatPanel />}
      {showPolls && <PollPanel />}
    </div>
  );
}