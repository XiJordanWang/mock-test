"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Reading from "./reading";
import axios from "../../api/axiosConfig";
import { ReadingTest } from "./interface";

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

export default function Page() {
  const [testData, setTestData] = useState<ReadingTest | null>(null);
  const [option, setOption] = useState<number | null>(null);

  const handleNext = async () => {
    if (testData?.index) {
      const test = await nextQuestion(testData.index, option ? option : 0);
      setTestData(test);
    }
  };

  const handleBack = async () => {
    if (testData?.index) {
      if (testData.index - 1 === 0) {
        alert("You cannot go back any further.");
        return;
      }
      const test = await backQuestion(testData.index);
      setTestData(test);
    }
  };

  useEffect(() => {
    const startReadingSession = async () => {
      const response = await axios.post<ReadingTest>("/reading/start");
      setTestData(response.data);
    };
    startReadingSession();
  }, []);

  const handleOptionChange = (newOption: number) => {
    console.log(newOption);
    setOption(newOption);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header onNext={handleNext} onBack={handleBack} />
      {testData ? (
        <Reading testData={testData} onOptionChange={handleOptionChange} />
      ) : (
        <div>Loading...</div> // Or some other placeholder while loading
      )}
    </div>
  );
}
