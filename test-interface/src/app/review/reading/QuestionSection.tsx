// QuestionSection.tsx
import React from "react";
import { ReadingReviewDTO } from "../interface";

interface QuestionSectionProps {
  data: ReadingReviewDTO;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ data }) => {
  return (
    <div className="flex-1 flex flex-col items-start px-4">
      <div className="question-container p-4">
        {data.type !== "INSERTION" && (
          <h1 className="text-2xl font-bold">{data.question}</h1>
        )}
        {data.type === "INSERTION" && (
          <>
            <h1 className="text-2xl font-bold flex items-center">
              Look at the four squares that indicate where the following
              sentence could be added to the passage.
            </h1>
            <div className="p-4 mt-10 text-xl mb-10">{data.question}</div>
            <h1 className="text-2xl font-bold flex items-center">
              Where would the sentence best fit? Select a square to add the
              sentence to the passage.
            </h1>
          </>
        )}
        <div className="mt-4 text-lg">
          {data.type !== "INSERTION" &&
            data.type !== "MULTIPLE_CHOICE" &&
            data.selections.map((selection) => (
              <div
                className={`flex items-center mb-2 ${
                  selection.correctness ? "bg-green-500" : ""
                } ${selection.myAnswer ? "bg-red-500" : ""}`}
                key={selection.id}
              >
                <input
                  type="radio"
                  id={`option${selection.id}`}
                  name="question"
                  value={selection.id}
                  className="hidden"
                  disabled
                />
                <label
                  htmlFor={`option${selection.id}`}
                  className="custom-radio"
                >
                  <span className="radio-checkmark"></span>
                  <span style={{ fontSize: "20px" }}>
                    {selection.information}
                  </span>
                </label>
              </div>
            ))}
          {data.type === "MULTIPLE_CHOICE" &&
            data.selections.map((selection) => (
              <div
                className={`flex items-center mb-2 ${
                  selection.correctness ? "bg-green-500" : ""
                } ${selection.myAnswer ? "bg-red-500" : ""}`}
                key={selection.id}
              >
                <div key={selection.id}>
                  <input
                    type="checkbox"
                    id={`option${selection.id}`}
                    name="question"
                    value={selection.id}
                    className="checkbox"
                    disabled
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
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
