"use client";

import { getAverage, getLast, getTasks, taskComplete } from "@/api/testAPI";
import React, { useState, useEffect } from "react";
import { Task } from "./Task";

interface TestResult {
  reading: number;
  listening: number;
  speaking: number;
  writing: number | null;
  overall: number;
  startDate: string;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Dashboard = () => {
  const [examDate] = useState(new Date("2024-09-21"));
  const [daysLeft, setDaysLeft] = useState(0);
  const [mockResults, setMockResults] = useState<TestResult | null>(null);
  const [averageResults, setAverageResults] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchLatestTestResult();
    fetchLatestAverageTestScore();
    fetchTasks();
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

  const toggleTask = async (id: number) => {
    // Find the current task
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;
    // Update the local state first
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    try {
      // Call the API to update the task completion status
      await taskComplete(id, !currentTask.completed);
    } catch (error) {
      console.error("Failed to update task completion status:", error);
      // Optionally, revert the local state update if the request fails
      setTasks(tasks); // Reset to original tasks if needed
    }
  };

  return (
    <div className="min-h-full bg-gray-100">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Countdown */}
            <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold mb-2">Days Until Exam</h2>
              <p className="text-6xl text-center text-teal-600">{daysLeft}</p>
              <p className="text-lg text-center text-gray-600">days left</p>
              <p className="text-sm text-center text-gray-600">
                Exam Date: {examDate.toLocaleDateString()}
              </p>
            </div>

            {/* Daily Tasks */}
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-2">Daily Tasks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tasks.map((task) => (
                  <Task key={task.id} task={task} toggleTask={toggleTask} />
                ))}
              </div>
            </div>

            {/* Latest Mock Test Result */}
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-2">
                Latest Mock Test Result
              </h2>
              {error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : mockResults ? (
                <>
                  <p className="text-center text-gray-600 mb-2">
                    Test Date:{" "}
                    {new Date(mockResults.startDate).toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.keys(mockResults)
                      .filter((key) => key !== "startDate")
                      .map((subject) => (
                        <div key={subject} className="text-center">
                          <h3 className="font-semibold capitalize text-gray-700">
                            {subject}
                          </h3>
                          <p className="text-4xl text-teal-600">
                            {
                              (
                                mockResults as unknown as Record<
                                  string,
                                  number | null
                                >
                              )[subject]
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            Target:{" "}
                            {targetScore[subject as keyof typeof targetScore]}
                          </p>
                          <p className="text-sm text-red-600">
                            Diff:{" "}
                            {scoreDifference(
                              (
                                mockResults as unknown as Record<
                                  string,
                                  number | null
                                >
                              )[subject],
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
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold mb-2">Average Scores</h2>
              {averageResults ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.keys(averageResults).map((subject) => (
                    <div key={subject} className="text-center">
                      <h3 className="font-semibold capitalize text-gray-700">
                        {subject}
                      </h3>
                      <p className="text-4xl text-teal-600">
                        {
                          (
                            averageResults as unknown as Record<
                              string,
                              number | null
                            >
                          )[subject]
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        Target:{" "}
                        {targetScore[subject as keyof typeof targetScore]}
                      </p>
                      <p className="text-sm text-red-600">
                        Diff:{" "}
                        {scoreDifference(
                          (
                            averageResults as unknown as Record<
                              string,
                              number | null
                            >
                          )[subject],
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
