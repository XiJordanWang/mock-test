"use client";

// Page.tsx
import React, { useState } from "react";
import Header from "./header";
import Reading from "./reading";

export default function Page() {
  const [questionNum, setQuestionNum] = useState(0);

  const handleNext = () => {
    setQuestionNum((prevNum) => prevNum + 1);
  };

  const handleBack = () => {
    setQuestionNum((prevNum) => Math.max(prevNum - 1, 0)); // Ensure questionNum does not go below 0
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header onNext={handleNext} onBack={handleBack} />
      <Reading questionNum={questionNum} />
    </div>
  );
}