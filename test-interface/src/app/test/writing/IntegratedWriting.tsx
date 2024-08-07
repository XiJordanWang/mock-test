import React, { useState, useEffect, ChangeEvent } from "react";
import "./writing.css";
import { IntegratedWritingProps, Writing } from "../interface";
import { EyeIcon } from "@heroicons/react/16/solid";
import { getQuestion } from "@/api/writingAPI";
import parse from "html-react-parser";

const IntegratedWriting = ({
  isDisable,
  id,
  onTextChange,
}: IntegratedWritingProps) => {
  const [text, setText] = useState("");
  const [isTimeVisible, setIsTimeVisible] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [writingData, setWritingData] = useState<Writing>();

  // Calculate word count
  useEffect(() => {
    const countWords = (text: string) => {
      return text.trim().split(/\s+/).filter(Boolean).length;
    };
    setWordCount(countWords(text));
  }, [text]);

  const fetchData = async (id: number) => {
    const data = await getQuestion(id);
    setWritingData(data);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText); // Call the callback
  };

  const handleHideTime = () => {
    setIsTimeVisible((prevState) => !prevState);
  };

  return (
    <>
      {!isDisable && (
        <div className="border border-gray-300 rounded-lg p-5 ml-5 mr-5">
          <div className="p-2 bg-sky-100 rounded-lg">
            <span className="font-bold ">Directions: </span>You have 20 minutes
            to plan and write your response. Your response will be judged on the
            basis of the quality of your writing and on how well your response
            presents the points in the lecture and their relationship to the
            reading passage. Typically, an effective response will be 150 to 225
            words.
          </div>
          <div className="font-bold p-2">Question: {writingData?.question}</div>
        </div>
      )}

      <div className="flex h-screen p-5 gap-4 overflow-hidden">
        <div className="w-1/2 h-full border border-gray-300 rounded-lg p-5 overflow-y-auto bg-white">
          {parse(writingData?.reading ? writingData?.reading : "")}
        </div>
        <div className="w-1/2 h-full border border-gray-300 rounded-lg flex flex-col overflow-hidden">
          {!isDisable && (
            <div className="flex justify-between items-center p-2">
              <div className="flex space-x-2">
                <button className="m-1 p-2 px-4 py-2 bg-[#0D6B6E] text-white rounded">
                  Cut
                </button>
                <button className="m-1 p-2 px-4 py-2 bg-white rounded">
                  Paste
                </button>
                <button className="m-1 p-2 px-4 py-2 bg-white rounded">
                  Undo
                </button>
                <button className="m-1 p-2 px-4 py-2 bg-white rounded">
                  Redo
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleHideTime}
                  className="flex items-center space-x-2 bg-[#0D6B6E] text-white px-2 py-1 rounded-md hover:bg-[#025d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#027f80]"
                >
                  <EyeIcon className="h-5 w-5" />
                  <span>
                    {isTimeVisible ? "Hide Word Count" : "Show Word Count"}
                  </span>
                </button>
                {isTimeVisible && (
                  <span className="text-[#0D6B6E]">{wordCount}</span>
                )}
              </div>
            </div>
          )}
          <textarea
            className="w-full h-full border border-gray-300 rounded p-3 flex-grow resize-none"
            value={text}
            onChange={handleChange}
            disabled={isDisable}
          />
        </div>
      </div>
    </>
  );
};

export default IntegratedWriting;
