import React, { useState, useEffect } from "react";
import { FaMicrophoneSlash } from "react-icons/fa";

const CountdownTimer = ({
  duration,
  start,
  onTimerEnd,
  label,
  color,
}: {
  duration: number;
  start: boolean;
  onTimerEnd: () => void;
  label: string;
  color: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset timeLeft whenever duration changes
  }, [duration]);

  useEffect(() => {
    if (start && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (start && timeLeft === 0) {
      onTimerEnd();
    }
  }, [start, timeLeft]); // eslint-disable-line

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `00:${mins}:${secs}`;
  };

  const circleRadius = 14;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const circleStyle = {
    strokeDasharray: circleCircumference,
    strokeDashoffset:
      circleCircumference - (timeLeft / duration) * circleCircumference,
    transition: "stroke-dashoffset 1s linear",
    stroke: "#0D6B6E", // Apply the color to the stroke
  };

  return (
    <div className="border-2 border-[#0D6B6E] flex flex-col items-center justify-center m-4 rounded-lg w-48 mx-auto">
      <div
        className="w-full text-center p-2 rounded-t-lg font-bold"
        style={{ backgroundColor: color }}
      >
        {label}
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="relative flex items-center pb-2 justify-center">
          <svg width="32" height="32" className="absolute">
            <circle
              cx="16"
              cy="16"
              r={circleRadius}
              strokeWidth="4"
              fill="none"
              style={circleStyle}
            />
          </svg>
          <FaMicrophoneSlash className="text-gray-700" size="16" />
        </div>
        <div className="ml-3 pb-2 text-xl font-bold">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
