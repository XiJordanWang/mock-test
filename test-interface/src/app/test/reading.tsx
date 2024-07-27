"use client";

import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import Middle from "./middle";
import "./reading.css"; // Ensure to import the CSS file
import { ApiResponse, ReadingProps } from "./interface";

export default function Reading({ testData, onOptionChange }: ReadingProps) {
  // Destructure props
  const [data, setData] = useState<ApiResponse | null>(null);
  const [mySelection, setMySelection] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (testData.index) {
        const response = await axios.get<ApiResponse>(
          `/reading/${testData.index}`
        );
        setData(response.data);
        setMySelection(response.data.mySelection);
        if (onOptionChange) {
          onOptionChange(response.data.mySelection);
        }
      }
    };
    fetchData();
  }, [onOptionChange, testData]); // Depend on testData.index to refetch data when it changes

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onOptionChange) {
      setMySelection(parseInt(event.target.value));
      onOptionChange(parseInt(event.target.value));
    }
  };

  const processContent = (content: string, paragraphNum: number) => {
    // Create a DOM parser
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(content, "text/html");
    // Select all paragraph elements
    const paragraphs = doc.querySelectorAll("p");

    paragraphs.forEach((p, index) => {
      // Adjust class name based on paragraph number
      if (index + 1 === paragraphNum) {
        p.classList.add("paragraph-line");
      } else {
        p.classList.remove("paragraph-line");
      }
    });

    // Return the updated HTML as a string
    return doc.body.innerHTML;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Middle testData={testData} />
      <div className="flex h-[calc(100vh-64px)] p-4 gap-4">
        {" "}
        {/* Added gap-4 for margin between boxes */}
        {/* Left side for article */}
        <div className="flex-1 bg-gray-100 border border-white rounded-lg overflow-y-auto p-4">
          <div className="tpo-article-box">
            <div className="tpo-article p-4" style={{ height: "495px" }}>
              <div
                className="article-title text-center font-bold"
                style={{ fontSize: "20px" }}
              >
                {data.heading}
              </div>
              <div
                className="article-content"
                style={{ fontSize: "20px" }}
                dangerouslySetInnerHTML={{
                  __html: processContent(data.context, data.paragraphNum),
                }}
              />
            </div>
          </div>
        </div>
        {/* Right side for question and selections */}
        <div className="flex-1 flex flex-col items-start px-4">
          <div className="question-container p-4">
            <h1 className="text-2xl font-bold">{data.question}</h1>
            <div className="mt-4 text-lg">
              {data.selections.map((selection) => (
                <div className="flex items-center mb-2" key={selection.id}>
                  <input
                    type="radio"
                    id={`option${selection.id}`}
                    name="question"
                    value={selection.id}
                    className="hidden"
                    checked={selection.id === mySelection}
                    onChange={handleOptionChange}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
