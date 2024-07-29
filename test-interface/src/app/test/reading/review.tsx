"use client";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { ReadingTest, ReviewProps } from "../interface";
import Middle from "../middle";

const getReviewData = async () => {
  const response = await axios.get<ReadingTest>("/reading/review");
  return response.data;
};

const Review = ({ onSelectedQuestionIndex, onSubmit }: ReviewProps) => {
  const [testData, setTestData] = useState<ReadingTest>();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const newTestData = await getReviewData();
      setTestData(newTestData);
    };
    fetchData();
  }, []);

  const handleRowClick = (index: number) => {
    setSelectedQuestionIndex(index);
    onSelectedQuestionIndex(index);
  };

  return (
    <>
      {testData ? (
        <Middle testData={testData} onSubmit={onSubmit} />
      ) : (
        <div>loading...</div>
      )}
      <div className="ml-20 mr-20 mb-10 overflow-y-scroll">
        <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#0D6B6E]">
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {testData?.questions.map((question) => (
              <tr
                key={question.index}
                className={`cursor-pointer ${
                  selectedQuestionIndex === question.index ? "bg-[#0D6B6E]" : ""
                }`}
                onClick={() => handleRowClick(question.index)}
              >
                <td className="border border-gray-300 p-2">
                  {question.index + ". " + question.question}
                </td>
                <td className="border border-gray-300 p-2">
                  {question.isSelected ? "Answered" : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Review;
