import React, { useState, ChangeEvent, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/16/solid"; // Ensure this import matches your setup
import { AcademicDiscussionProps, Writing } from "../interface";
import { getQuestion } from "@/api/writingAPI";

const AcademicDiscussion = ({ id, onTextChange }: AcademicDiscussionProps) => {
  const [text, setText] = useState("");
  const [isTimeVisible, setIsTimeVisible] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [writingData, setWritingData] = useState<Writing>();

  const fetchData = async (id: number) => {
    const data = await getQuestion(id);
    setWritingData(data);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  // Calculate word count
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
    onTextChange(e.target.value);
  };

  // Toggle word count visibility
  const handleHideTime = () => {
    setIsTimeVisible((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen p-5 gap-4">
      {/* Left Side */}
      <div className="w-1/2 h-full border border-gray-300 rounded-lg p-5 bg-white">
        <div className="text-base" style={{ fontSize: "20px" }}>
          <div className="mb-6">
            <p className="mb-2">
              Your professor is teaching a class on education.
            </p>
            <p className="mb-4">
              Write a post responding to the professor's question.
            </p>
          </div>
          <p className="font-bold mb-4">
            In your response, you should do the following:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Express and support your opinion.</li>
            <li>Make a contribution to the discussion in your own words.</li>
          </ul>
          <p className="mb-6">
            An effective response will contain at least 100 words.
          </p>

          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/male.png"
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            <div className="text-center font-bold mt-2">Dr. Howard</div>
          </div>

          <p className="leading-relaxed">{writingData?.professorQuestion}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col gap-4">
        {/* Top Right Section */}
        <div className="flex-1 border border-gray-300 rounded-lg p-5 bg-white flex flex-col">
          <div className="text-base" style={{ fontSize: "20px" }}>
            <div className="flex items-start mb-6">
              <div className="flex flex-col items-center mr-6">
                <img
                  src="/Paul.jpeg"
                  alt="Avatar 1"
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
                <div className="text-center font-bold mt-2">Paul</div>
              </div>
              <div className="flex-1">
                <p className="mb-4">{writingData?.studentA}</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="flex flex-col items-center mr-6">
                <img
                  src="/Claire.jpg"
                  alt="Avatar 2"
                  className="w-20 h-20 rounded-full border-2 border-gray-300"
                />
                <div className="text-center font-bold mt-2">Claire</div>
              </div>
              <div className="flex-1">
                <p className="mb-4">{writingData?.studentB}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Section */}
        <div className="flex-1 border border-gray-300 rounded-lg p-5 bg-white flex flex-col">
          <div className="flex justify-between items-center p-2 mb-1">
            <div className="flex space-x-2">
              <button className="m-1 p-1 px-2 py-1 bg-[#0D6B6E] text-white rounded text-sm">
                Cut
              </button>
              <button className="m-1 p-1 px-2 py-1 bg-white rounded border border-gray-300 text-sm">
                Paste
              </button>
              <button className="m-1 p-1 px-2 py-1 bg-white rounded border border-gray-300 text-sm">
                Undo
              </button>
              <button className="m-1 p-1 px-2 py-1 bg-white rounded border border-gray-300 text-sm">
                Redo
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleHideTime}
                className="flex items-center space-x-2 bg-[#0D6B6E] text-white px-2 py-1 rounded-md hover:bg-[#025d5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#027f80]"
              >
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm">
                  {isTimeVisible ? "Hide Word Count" : "Show Word Count"}
                </span>
              </button>
              {isTimeVisible && (
                <span className="text-[#0D6B6E] text-sm">{wordCount}</span>
              )}
            </div>
          </div>
          <textarea
            className="w-full h-full border border-gray-300 rounded p-3 resize-none"
            value={text}
            onChange={handleChange}
            style={{ minHeight: "100px" }} // Ensures a minimum height for the textarea
          />
        </div>
      </div>
    </div>
  );
};

export default AcademicDiscussion;
