import { MicOff } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface VideoWindowProps {
  stream: MediaStream;
  name: string;
  isSelf?: boolean;
  isMuted?: boolean;
}

export function VideoWindow({ stream, name, isSelf, isMuted }: VideoWindowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isSelf}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 flex items-center space-x-2">
        <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
          {name}
        </div>
        {isMuted && (
          <div className="bg-black/50 p-1 rounded">
            <MicOff className="w-4 h-4 text-red-500" />
          </div>
        )}
      </div>
    </div>
  );
}