"use client";

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

export default function Reading() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>("/reading/1/0");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Middle />
      <div className="flex h-[calc(100vh-64px)] p-4">
        {/* Left side for article */}
        <div className="flex-1 bg-gray-100 border border-gray-300 rounded-lg overflow-y-auto p-4">
          <div className="tpo-article-box">
            <div className="tpo-article" style={{ height: "495px" }}>
              <div
                className="article-title text-center font-bold"
                style={{ fontSize: "20px" }}
              >
                {data.heading}
              </div>
              <div
                className="article-content"
                style={{ fontSize: "16px" }}
                dangerouslySetInnerHTML={{ __html: data.context }}
              />
            </div>
          </div>
        </div>
        {/* Right side for title */}
        <div className="flex-1 flex flex-col px-4">
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
                  {selection.information}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
