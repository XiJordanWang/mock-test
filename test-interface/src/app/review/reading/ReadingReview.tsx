"use client";

import React, { useState, useEffect } from "react";
import NumberButtons from "./NumberButtons";
import { getQuestions, reviewQuestion } from "@/api/readingAPI";
import { QuestionListDTO, ReadingReviewDTO } from "../interface";
import ReadingContent from "./ReadingContent";
import QuestionContent from "./QuestionSection";

interface ReadingReviewProps {
  ids: number[];
}

const ReadingReview = ({ ids }: ReadingReviewProps) => {
  const [questions, setQuestions] = useState<QuestionListDTO[]>([]);
  const [data, setData] = useState<ReadingReviewDTO>();

  const handleClick = (id: number) => {
    fetchData(id);
  };

  const fetchQuestions = async (ids: number[]) => {
    const data = await getQuestions(ids);
    setQuestions(data);
  };

  const fetchData = async (id: number) => {
    const data = await reviewQuestion(id);
    setData(data);
  };

  useEffect(() => {
    fetchQuestions(ids);
  }, [ids]);

  useEffect(() => {
    if (questions[0]?.id) {
      fetchData(questions[0]?.id);
    }
  }, [questions]);

  return (
    <>
      <div className="p-4">
        <NumberButtons questions={questions} onClick={handleClick} />
      </div>
      <div className="flex flex-1 h-full overflow-hidden">
        {data && (
          <div className="flex-1 overflow-auto p-4">
            <ReadingContent data={data} />
          </div>
        )}
        {data && (
          <div className="flex-1 overflow-auto p-4">
            <QuestionContent data={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default ReadingReview;
