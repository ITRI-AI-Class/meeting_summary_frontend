import React, { useState, useEffect } from 'react';
import {
  Mic, MicOff, Video, VideoOff, Phone, MessageSquare,
  Share2, Users, VoteIcon, Settings, MoreVertical, Wifi,
  Globe, Volume2
} from 'lucide-react';
import { Button } from '../common/Button';
import { Toast } from '../common/Toast';

interface VideoMeetingProps {
  meetingId: string;
  isHost: boolean;
}

export function VideoMeeting({ meetingId, isHost }: VideoMeetingProps) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'stable' | 'unstable'>('stable');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Simulate network monitoring
    const interval = setInterval(() => {
      const status = Math.random() > 0.8 ? 'unstable' : 'stable';
      setNetworkStatus(status);
      if (status === 'unstable') {
        setToastMessage('Network unstable, please check your connection');
        setShowToast(true);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleShare = () => setIsSharing(!isSharing);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`https://meetingmind.com/join/${meetingId}`);
    setToastMessage('Meeting link copied to clipboard');
    setShowToast(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main video grid */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Video windows would be rendered here */}
        <div className="aspect-video bg-gray-800 rounded-lg relative">
          <video className="w-full h-full object-cover rounded-lg" />
          <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
            You
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full ${
                isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5 text-white" />
              ) : (
                <MicOff className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full ${
                isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isCameraOn ? (
                <Video className="w-5 h-5 text-white" />
              ) : (
                <VideoOff className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleShare}
              className={`p-3 rounded-full ${
                isSharing ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={copyInviteLink}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <Users className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <MessageSquare className="w-5 h-5 text-white" />
            </button>

            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <VoteIcon className="w-5 h-5 text-white" />
            </button>

            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <Globe className="w-5 h-5 text-white" />
            </button>

            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <Volume2 className="w-5 h-5 text-white" />
            </button>

            <button className="p-3 rounded-full bg-red-500 hover:bg-red-600">
              <Phone className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Network status indicator */}
      {networkStatus === 'unstable' && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-yellow-500/90 text-white px-3 py-2 rounded-full">
          <Wifi className="w-4 h-4" />
          <span className="text-sm">Unstable Connection</span>
        </div>
      )}

      {showToast && (
        <Toast
          type="info"
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}