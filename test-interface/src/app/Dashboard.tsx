"use client";

import { getAverage, getLast } from "@/api/testAPI";
import React, { useState, useEffect } from "react";

interface TestResult {
  reading: number;
  listening: number;
  speaking: number;
  writing: number | null;
  overall: number;
  startDate: string;
}

const Dashboard = () => {
  const [examDate] = useState(new Date("2024-09-21"));
  const [daysLeft, setDaysLeft] = useState(0);
  const [mockResults, setMockResults] = useState<TestResult | null>(null);
  const [averageResults, setAverageResults] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const timeDiff = examDate.getTime() - today.getTime();
      setDaysLeft(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    };
    calculateDaysLeft();
  }, [examDate]);

  const fetchLatestTestResult = async () => {
    try {
      const data = await getLast();
      setMockResults(data);
    } catch {
      setError("Failed to fetch the latest test result.");
    }
  };

  const fetchLatestAverageTestScore = async () => {
    try {
      const data = await getAverage();
      setAverageResults(data);
    } catch {
      setError("Failed to fetch the average test scores.");
    }
  };

  useEffect(() => {
    fetchLatestTestResult();
    fetchLatestAverageTestScore();
  }, []);

  const targetScore = {
    overall: 93,
    reading: 23,
    listening: 23,
    speaking: 23,
    writing: 23,
  };

  const scoreDifference = (actual: number | null, target: number) => {
    return actual === null ? target : target - actual;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Countdown */}
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold mb-4">Days Until Exam</h2>
              <p className="text-6xl text-center text-teal-600">{daysLeft}</p>
              <p className="text-lg text-center text-gray-600">days left</p>
              <p className="text-sm text-center text-gray-600">
                Exam Date: {examDate.toLocaleDateString()}
              </p>
            </div>

            {/* Latest Mock Test Result */}
            <div className="bg-white p-6 shadow-lg rounded-lg col-span-1 lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">
                Latest Mock Test Result
              </h2>
              {error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : mockResults ? (
                <>
                  <p className="text-center text-gray-600 mb-4">
                    Test Date:{" "}
                    {new Date(mockResults.startDate).toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.keys(mockResults)
                      .filter((key) => key !== "startDate")
                      .map((subject) => (
                        <div key={subject} className="text-center">
                          <h3 className="font-semibold capitalize text-gray-700">
                            {subject}
                          </h3>
                          <p className="text-4xl text-teal-600">
                            {((mockResults as unknown) as Record<string, number | null>)[subject]}
                          </p>
                          <p className="text-sm text-gray-600">
                            Target: {targetScore[subject as keyof typeof targetScore]}
                          </p>
                          <p className="text-sm text-red-600">
                            Diff:{" "}
                            {scoreDifference(
                              ((mockResults as unknown) as Record<string, number | null>)[subject],
                              targetScore[subject as keyof typeof targetScore]
                            )}
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-center">Loading...</p>
              )}
            </div>

            {/* Average Scores */}
            <div className="bg-white p-6 shadow-lg rounded-lg col-span-1 lg:col-span-3">
              <h2 className="text-xl font-bold mb-4">Average Scores</h2>
              {averageResults ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.keys(averageResults).map((subject) => (
                    <div key={subject} className="text-center">
                      <h3 className="font-semibold capitalize text-gray-700">
                        {subject}
                      </h3>
                      <p className="text-4xl text-teal-600">
                        {((averageResults as unknown) as Record<string, number | null>)[subject]}
                      </p>
                      <p className="text-sm text-gray-600">
                        Target: {targetScore[subject as keyof typeof targetScore]}
                      </p>
                      <p className="text-sm text-red-600">
                        Diff:{" "}
                        {scoreDifference(
                          ((averageResults as unknown) as Record<string, number | null>)[subject],
                          targetScore[subject as keyof typeof targetScore]
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">Loading...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;