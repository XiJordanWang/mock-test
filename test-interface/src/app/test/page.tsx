"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Reading from "./reading";
import axios from "../../api/axiosConfig";
import { ReadingTest, Button } from "./interface";
import Review from "./review";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SpeakerWaveIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const nextQuestion = async (index: number, option: number) => {
  const response = await axios.put<ReadingTest>(
    `/reading/next/${index}/${option}`
  );
  return response.data;
};

const backQuestion = async (index: number) => {
  const response = await axios.put<ReadingTest>(`/reading/back/${index}`);
  return response.data;
};

const backToQuestion = async (index: number) => {
  const response = await axios.get<ReadingTest>(`/reading/question/${index}`);
  return response.data;
};

const readingButtons = [
  { name: "Volume", icon: SpeakerWaveIcon },
  { name: "Help", icon: QuestionMarkCircleIcon },
  { name: "Review", icon: BookmarkIcon },
  { name: "Back", icon: ArrowLeftIcon },
  {
    name: "Next",
    icon: ArrowRightIcon,
    backgroundColor: "white",
    textColor: "text-[#027f80]",
  },
];

const reviewButtons = [
  { name: "Return", icon: ArrowLeftIcon },
  {
    name: "Back To Question",
    icon: ArrowRightIcon,
    backgroundColor: "white",
    textColor: "text-[#027f80]",
  },
];

export default function Page() {
  const [testData, setTestData] = useState<ReadingTest | null>(null);
  const [option, setOption] = useState<number | null>(null);
  const [isReview, setIsReview] = useState<boolean>(false);
  const [buttons, setButtons] = useState<Button[]>([]);
  const [questionNum, setQuestionNum] = useState<number>();

  const handleNext = async () => {
    if (isReview) {
      setIsReview(false); // Go to question
    } else if (testData?.index) {
      const test = await nextQuestion(testData.index, option ? option : 0);
      setTestData(test);
    }
  };

  const handleBack = async () => {
    if (isReview) {
      setIsReview(false); // Return from review
    } else if (testData?.index) {
      if (testData.index - 1 === 0) {
        alert("You cannot go back any further.");
        return;
      }
      const test = await backQuestion(testData.index);
      setTestData(test);
    }
  };

  const handleBackToQuestion = async () => {
    if (questionNum) {
      const test = await backQuestion(questionNum);
      setTestData(test);
    }
  };

  const handleReview = () => {
    setIsReview(true);
    setButtons(reviewButtons);
  };

  const handleReturn = () => {
    setIsReview(false);
    setButtons(readingButtons);
  };

  const onSelectedQuestionIndex = (index: number) => {
    if (index != null && index !== 0) {
      setQuestionNum(index);
    }
  };

  const onBackToQuestion = async () => {
    setButtons(readingButtons);
    setIsReview(false);
    setButtons(readingButtons);
  };

  useEffect(() => {
    const startReadingSession = async () => {
      const response = await axios.post<ReadingTest>("/reading/start");
      setTestData(response.data);
      setButtons(readingButtons);
    };
    startReadingSession();
  }, []);

  const handleOptionChange = (newOption: number) => {
    setOption(newOption);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header
        onNext={handleNext}
        onBack={handleBack}
        onReview={handleReview}
        onReturn={handleReturn}
        onBackToQuestion={onBackToQuestion}
        isReview={isReview}
        buttons={buttons}
      />
      {isReview ? (
        <Review onSelectedQuestionIndex={onSelectedQuestionIndex} />
      ) : testData ? (
        <Reading testData={testData} onOptionChange={handleOptionChange} />
      ) : (
        <div>Loading...</div> // Or some other placeholder while loading
      )}
    </div>
  );
}
