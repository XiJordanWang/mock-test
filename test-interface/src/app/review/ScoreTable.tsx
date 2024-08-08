"use client";

import React, { useState } from "react";
import { TestDTO } from "./interface";
import Modal from "./Modal";

interface ScoreTableProps {
  scores: TestDTO[];
  onModalSelect: (type: string, ids: number[]) => void;
}

const ScoreTable: React.FC<ScoreTableProps> = ({ scores, onModalSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestDTO | null>(null);

  const handleDetailsClick = (test: TestDTO) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  const handleModuleSelect = (module: string, ids: number[]) => {
    if (selectedTest) {
      onModalSelect(module, ids);
      // You can add further logic to navigate or display module-specific details here
      handleCloseModal();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exam Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Overall Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reading Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Listening Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Speaking Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Writing Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {scores.map((score) => (
            <tr key={score.id}>
              <td className="px-6 py-4 whitespace-nowrap">{score.startTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {score.overallScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {score.readingScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {score.listeningScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {score.speakingScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {score.writingScore}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDetailsClick(score)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTest && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          testDTO={selectedTest} // Pass the selectedTest as testDTO
          onModuleSelect={handleModuleSelect}
        />
      )}
    </div>
  );
};

export default ScoreTable;
