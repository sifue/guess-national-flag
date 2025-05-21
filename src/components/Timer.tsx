import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

const Timer: React.FC = () => {
  const { isGameActive, startTime, updateElapsedTime } = useGameContext();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isGameActive && startTime) {
      interval = window.setInterval(() => {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        setTime(currentTime);
        updateElapsedTime(currentTime);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameActive, startTime, updateElapsedTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-mono">
      {formatTime(time)}
    </div>
  );
};

export default Timer; 