'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  duration: number; // in minutes
  onComplete: () => void;
  isActive: boolean;
}

export default function Timer({ duration, onComplete, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isActive, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-4xl font-bold">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <button
        onClick={toggleTimer}
        className={`px-4 py-2 rounded-lg ${
          isRunning ? 'bg-red-500' : 'bg-green-500'
        } text-white font-semibold`}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
    </div>
  );
} 