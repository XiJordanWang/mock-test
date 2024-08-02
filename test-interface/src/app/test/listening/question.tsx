import React, { useState, useEffect, useRef } from "react";
import "./listening.css";
import { ListeningQuestion, ListeningQuestionProps } from "../interface";
import { getQuestion, selectQuestion } from "@/api/listeningAPI";

const Question: React.FC<ListeningQuestionProps> = ({
  questionId,
  onEnded,
}) => {
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [question, setQuestion] = useState<ListeningQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleEnd = () => {
        setIsAudioEnded(true);
        onEnded();
      };

      audio.addEventListener("ended", handleEnd);

      return () => {
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, []);

  useEffect(() => {
    setIsAudioEnded(false);
    const fetchQuestionData = async () => {
      const question = await getQuestion(questionId);
      setQuestion(question);
    };
    fetchQuestionData();
  }, [questionId]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(parseInt(e.target.value));
    selectQuestion(questionId, parseInt(e.target.value));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-4">
        <strong className="text-xl question-title">{question?.question}</strong>
      </div>

      <audio
        ref={audioRef}
        src={"http://localhost:8080/files/QUESTION/" + question?.id}
        autoPlay
      />

      {isAudioEnded && (
        <div className="mt-4">
          <form>
            {question?.selections.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`option${item.id}`}
                  name="question"
                  value={item.id}
                  checked={selectedOption === item.id}
                  onChange={handleOptionChange}
                  className="hidden"
                />
                <label htmlFor={`option${item.id}`} className="custom-radio">
                  <span className="radio-checkmark"></span>
                  <span>{item.information}</span>
                </label>
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default Question;
