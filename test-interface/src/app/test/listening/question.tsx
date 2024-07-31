import React, { useState, useEffect, useRef } from "react";
import "./listening.css";

const Question: React.FC = () => {
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleEnd = () => {
        setIsAudioEnded(true);
      };

      audio.addEventListener("ended", handleEnd);

      return () => {
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-4">
        <strong className="text-xl question-title">
          Why does the student speak with the professor?
        </strong>
      </div>

      <audio ref={audioRef} src="/1_1.mp3" autoPlay />

      {isAudioEnded && (
        <div className="mt-4">
          <form>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="optionA"
                name="question"
                value="A"
                className="hidden"
              />
              <label htmlFor="optionA" className="custom-radio">
                <span className="radio-checkmark"></span>
                <span>
                  A. To ask for assistance coming up with an idea for her
                  assignment
                </span>
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="optionB"
                name="question"
                value="B"
                className="hidden"
              />
              <label htmlFor="optionB" className="custom-radio">
                <span className="radio-checkmark"></span>
                <span>B. To go over an article the professor had assigned</span>
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="optionC"
                name="question"
                value="C"
                className="hidden"
              />
              <label htmlFor="optionC" className="custom-radio">
                <span className="radio-checkmark"></span>
                <span>
                  C. To discuss an architectural concept she would like to work
                  with
                </span>
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="optionD"
                name="question"
                value="D"
                className="hidden"
              />
              <label htmlFor="optionD" className="custom-radio">
                <span className="radio-checkmark"></span>
                <span>
                  D. To review her work on a project she recently submitted
                </span>
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Question;
