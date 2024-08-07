import React, { useEffect, useRef } from "react";
import { SpeakingDirectionProps } from "../interface";

export default function Direction({
  onEnded,
  section,
}: SpeakingDirectionProps) {
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
  }, []); // eslint-disable-line

  return (
    <div className="p-4 ml-40 mr-40 mt-20 h-screen">
      <h1 className="text-2xl font-bold mb-8">Question {section} Directions</h1>
      <hr className="my-4 border-gray-400" />
      {section === 1 && (
        <>
          <p className="mb-4">
            You will now give your opinion about a familiar topic. After you
            hear the question, you will have 15 seconds to prepare and 45
            seconds to speak.
          </p>
          <audio ref={audioRef} src="/Direction1.m4a" autoPlay />
        </>
      )}
      {section === 2 && (
        <>
          <p className="mb-4">
            Now you will read a passage about a campus situation and then listen
            to a conversation about the same topic. You may advance to the
            conversation before the reading time ends by selecting{" "}
            <span className="font-bold">Continue</span> and then{" "}
            <span className="font-bold">Confirm</span>. After the conversation,
            you will answer a question, using information from both the reading
            passage and the conversation. You will have 30 seconds to prepare
            and 60 seconds to speak.
          </p>
          <audio ref={audioRef} src="/Direction2.m4a" autoPlay />
        </>
      )}
      {section === 3 && (
        <>
          <p className="mb-4">
            Now you will read a passage about an academic subject and then
            listen to a lecture on the same topic. You may advance to the
            lecture before the reading time ends by selecting{" "}
            <span className="font-bold">Continue</span> and then{" "}
            <span className="font-bold">Confirm</span>. After the lecture, you
            will answer a question, using information from both the reading
            passage and the lecture. You will have 30 seconds to prepare and 60
            seconds to speak.
          </p>
          <audio ref={audioRef} src="/Direction3.m4a" autoPlay />
        </>
      )}
      {section === 4 && (
        <>
          <p className="mb-4">
            Now you will listen to a lecture. You will then be asked to
            summarize the lecture. You will have 20 seconds to prepare and 60
            seconds to speak.
          </p>
          <audio ref={audioRef} src="/Direction4.m4a" autoPlay />
        </>
      )}
    </div>
  );
}
