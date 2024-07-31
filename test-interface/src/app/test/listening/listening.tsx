// pages/Listening.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ListeningProps } from "../interface";

const Listening: React.FC<ListeningProps> = ({ onListeningEnded }) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateProgress = () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
      };
      const handleEnd = () => {
        onListeningEnded();
      };
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnd);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full flex justify-center mb-4">
        <Image
          src="/img26.jpg"
          alt="Listening"
          width={700}
          height={466}
          className="object-contain"
        />
      </div>
      <div className="w-2/3 bg-gray-300 h-4 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#0D6B6E] h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <audio ref={audioRef} src="/1_1.mp3" autoPlay />
    </div>
  );
};

export default Listening;
