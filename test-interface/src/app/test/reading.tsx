"use client";

// Reading.tsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import Middle from "./middle";
import "./reading.css"; // Ensure to import the CSS file

interface Selection {
  id: number;
  information: string;
}

interface ApiResponse {
  id: number;
  heading: string;
  context: string;
  paragraphNum: number;
  question: string;
  type: string;
  selections: Selection[];
}

interface ReadingProps {
  questionNum: number;
}

export default function Reading({ questionNum }: ReadingProps) {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`/reading/1/${questionNum}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [questionNum]); // Depend on questionNum to refetch data when it changes

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

    // Add background color to the word "periodically"
    // const textNodes = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
    // while (textNodes.nextNode()) {
    //   const node = textNodes.currentNode as Text;
    //   const word = "periodically";
    //   if (node.nodeValue?.includes(word)) {
    //     const span = doc.createElement("span");
    //     span.style.backgroundColor = "#0D6B6E";
    //     span.style.color = "white"; // Set text color to white
    //     span.textContent = word;
    //     const newTextNode = document.createTextNode(node.nodeValue.replace(word, ""));
    //     node.parentNode?.replaceChild(newTextNode, node);
    //     newTextNode.parentNode?.insertBefore(span, newTextNode.nextSibling);
    //   }
    // }

    // Return the updated HTML as a string
    return doc.body.innerHTML;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Middle />
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
                dangerouslySetInnerHTML={{ __html: processContent(data.context, data.paragraphNum) }}
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