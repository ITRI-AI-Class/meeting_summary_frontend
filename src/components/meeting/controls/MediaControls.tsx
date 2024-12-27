import React from 'react';
import { Mic, MicOff, Video, VideoOff, Share2 } from 'lucide-react';
import { ControlButton } from './ControlButton';

interface MediaControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isSharing: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleShare: () => void;
}

export function MediaControls({
  isMicOn, isCameraOn, isSharing,
  onToggleMic, onToggleCamera, onToggleShare
}: MediaControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <ControlButton
        isActive={isMicOn}
        onClick={onToggleMic}
        activeIcon={<Mic className="w-5 h-5" />}
        inactiveIcon={<MicOff className="w-5 h-5" />}
      />
      <ControlButton
        isActive={isCameraOn}
        onClick={onToggleCamera}
        activeIcon={<Video className="w-5 h-5" />}
        inactiveIcon={<VideoOff className="w-5 h-5" />}
      />
      <ControlButton
        isActive={isSharing}
        onClick={onToggleShare}
        activeIcon={<Share2 className="w-5 h-5" />}
        variant="success"
      />
    </div>
  );
}