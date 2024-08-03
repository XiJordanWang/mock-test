import React, { useState, useEffect, useRef } from "react";
import "./listening.css";
import { ListeningQuestion, ListeningQuestionProps } from "../interface";
import {
  getQuestion,
  selectMutipleQuestion,
  selectQuestion,
} from "@/api/listeningAPI";

const Question: React.FC<ListeningQuestionProps> = ({
  questionId,
  onEnded,
}) => {
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [question, setQuestion] = useState<ListeningQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mySelections, setMySelections] = useState<number[] | []>([]);
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
  }, []); // eslint-disable-line

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMySelections((prevSelections: number[]) =>
      prevSelections.includes(value)
        ? prevSelections.filter((id) => id !== value)
        : [...prevSelections, value]
    );
  };

  useEffect(() => {
    if (mySelections.length > 0) {
      selectMutipleQuestion(questionId, mySelections);
    }
  }, [mySelections]); // eslint-disable-line

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
            {question?.type === "MULTIPLE_CHOICE" && (
              <>
                <div
                  className="bg-[#ccf5f7] rounded-2xl p-2 mb-4 text-center"
                  style={{ marginLeft: "50px", marginRight: "50px" }}
                >
                  Select {question.correctNumber} answers.
                </div>
                {question?.selections.map((selection) => (
                  <div className="flex items-center mb-2" key={selection.id}>
                    <div key={selection.id}>
                      <input
                        type="checkbox"
                        id={`option${selection.id}`}
                        name="question"
                        value={selection.id}
                        className="checkbox"
                        checked={mySelections?.includes(selection.id)}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor={`option${selection.id}`}
                        className="custom-checkbox"
                      >
                        <span className="checkbox-checkmark"></span>
                        <span style={{ fontSize: "20px" }}>
                          {selection.information}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </>
            )}
            {question?.type !== "MULTIPLE_CHOICE" &&
              question?.selections.map((item) => (
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
