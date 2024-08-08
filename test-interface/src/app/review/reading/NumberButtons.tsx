import React, { useState } from "react";
import { QuestionListDTO } from "../interface";

interface NumberButtonsProps {
  questions: QuestionListDTO[];
  onClick: (id: number) => void;
}

const NumberButtons: React.FC<NumberButtonsProps> = ({
  questions,
  onClick,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleButtonClick = (id: number) => {
    setSelectedId(id); // Update selected button ID
    onClick(id); // Call the onClick prop
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {questions.map((question) => (
        <button
          key={question.id}
          onClick={() => handleButtonClick(question.id)}
          className={`w-10 h-10 text-lg font-medium rounded-full border hover:bg-gray-100 ${
            question.correctness ? "bg-green-700" : "bg-red-500"
          } ${question.id === selectedId ? "ring-4 ring-blue-500" : ""}`}
        >
          {question.id}
        </button>
      ))}
    </div>
  );
};

export default NumberButtons;
