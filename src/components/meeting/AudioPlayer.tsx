import React, { useState, useRef , forwardRef, useImperativeHandle } from 'react';

interface AudioPlayerProps {
  src: string;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

// const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ src }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current?.play();
      setIsPlaying(true);
    },
    pause: () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    },
    seek: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      }
    }
  }));

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center justify-between">
        <button onClick={togglePlay} className="text-gray-700 dark:text-gray-200">
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11.25l-6-4.5v9l6-4.5z"></path>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"></circle>
            </svg>
          )}
        </button>
        <div className="flex-grow mx-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            className="w-full h-2 bg-gray-200 dark:bg-gray-400 rounded-full appearance-none focus:outline-none peer"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
                setCurrentTime(Number(e.target.value));
              }
            }}
          />
        </div>
        <span className="text-gray-700 dark:text-gray-200 text-sm">
          {new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(duration * 1000).toISOString().substr(14, 5)}
        </span>
      </div>
      <style>
    {`
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background-color: #F9FAFB; /* 滑動點顏色 */
        border-radius: 50%;
        cursor: pointer;
      }
      input[type="range"]:hover::-webkit-slider-thumb {
        background-color: #F9FAFB; /* 滑鼠懸停時變色 */
      }
    `}
  </style>
    </div>
  );
});

export default AudioPlayer;