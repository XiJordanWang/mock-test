"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header";
import ScoreTable from "./ScoreTable";
import { TestDTO, PaginatedTestResults } from "./interface";
import { getPaginatedTests } from "@/api/testAPI";
import Reading from "./reading/ReadingReview";

const Page = () => {
  const [testData, setTestData] = useState<TestDTO[]>([]);
  const [page, setPage] = useState(0); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total pages
  const [size] = useState(10); // Number of items per page
  const [isScoreTable, setIsScoreTable] = useState(true); //
  const [isReading, setIsReading] = useState(false); //
  const [ids, setIds] = useState<number[]>([]); //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PaginatedTestResults = await getPaginatedTests(page, size);
        setTestData(data.content); // Assuming content holds the list of test results
        setTotalPages(data.totalPages); // Assuming totalPages is available
      } catch (error) {
        console.error("Failed to fetch test data:", error);
      }
    };

    fetchData();
  }, [page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleModalSelect = (type: string, ids: number[]) => {
    if (ids) {
      setIds(ids);
    }

    switch (type) {
      case "Reading":
        setIsScoreTable(false);
        setIsReading(true);
        break;
      case "Listening":
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-1 p-4 overflow-auto">
        {isScoreTable && (
          <>
            <h1 className="text-2xl font-bold mb-4">Exam Scores Review</h1>
            <ScoreTable scores={testData} onModalSelect={handleModalSelect} />
            <div className="mt-10 flex justify-between">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1}
                className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
        {isReading && (
          <>
            <Reading ids={ids} />
          </>
        )}
      </main>
    </div>
  );
};

export default Page;