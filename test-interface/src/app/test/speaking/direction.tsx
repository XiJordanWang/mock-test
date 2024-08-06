import React, { useEffect, useRef } from "react";
import { SpeakingDirectionProps } from "../interface";

export default function Direction({ onEnded }: SpeakingDirectionProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleEnd = () => {
        onEnded();
      };

      audio.addEventListener("ended", handleEnd);

      // Ensure audio starts playing as soon as the component is mounted
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });

      return () => {
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, []);

  return (
    <div className="p-4 ml-40 mr-40 mt-20 h-screen">
      <h1 className="text-2xl font-bold mb-8">Question 1 Directions</h1>
      <hr className="my-4 border-gray-400" />
      <p className="mb-4">
        You will now give your opinion about a familiar topic. After you hear
        the question, you will have 15 seconds to prepare and 45 seconds to
        speak.
      </p>
      <audio ref={audioRef} src="/Direction1.m4a" autoPlay />
    </div>
  );
}
