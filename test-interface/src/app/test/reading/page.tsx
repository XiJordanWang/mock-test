"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Header from "../header";
import Reading from "./reading";
import { ReadingRef, ReadingTest } from "../interface";
import Review from "./review";
import {
  backQuestion,
  backToQuestion,
  nextQuestion,
  start,
  submit,
} from "@/api/readingAPI";

export default function Page() {
  const readingRef = useRef<ReadingRef>();
  const router = useRouter();
  const [testData, setTestData] = useState<ReadingTest | null>(null);
  const [isReview, setIsReview] = useState<boolean>(false);
  const [buttons, setButtons] = useState<string>("Reading");
  const [questionNum, setQuestionNum] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const resetStyle = () => {
    if (readingRef.current) {
      readingRef.current.resetReading();
    }
  };

  const handleNext = async () => {
    if (isReview) {
      setIsReview(false);
    } else if (testData?.index) {
      if (testData.index === 20) {
        setShowModal(true);
      } else {
        const test = await nextQuestion(testData.index);
        setTestData(test);
      }
    }
    resetStyle();
  };

  const handleBack = async () => {
    if (isReview) {
      setIsReview(false);
    } else if (testData?.index) {
      if (testData.index - 1 === 0) {
        alert("You cannot go back any further.");
        return;
      }
      const test = await backQuestion(testData.index);
      setTestData(test);
    }
    resetStyle();
  };

  const handleBackToQuestion = async () => {
    if (questionNum !== null) {
      const test = await backToQuestion(questionNum);
      setTestData(test);
      setIsReview(false);
      setButtons("Reading");
    }
    resetStyle();
  };

  const handleReview = () => {
    setIsReview(true);
    setButtons("Review");
  };

  const handleReturn = () => {
    setIsReview(false);
    setButtons("Reading");
  };

  const onSelectedQuestionIndex = (index: number) => {
    if (index != null && index !== 0) {
      setQuestionNum(index);
    }
  };

  const handleConfirmFinish = async () => {
    setShowModal(false);
    await submit();
    router.push("/test/listening");
  };

  const handleCancelFinish = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    await submit();
    router.push("/test/listening");
  };

  useEffect(() => {
    const startReadingSession = async () => {
      const data = await start();
      setTestData(data);
    };
    startReadingSession();
  }, []);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header
        onNext={handleNext}
        onBack={handleBack}
        onReview={handleReview}
        onReturn={handleReturn}
        onBackToQuestion={handleBackToQuestion}
        isReview={isReview}
        buttons={buttons}
      />
      {isReview ? (
        <Review
          onSelectedQuestionIndex={onSelectedQuestionIndex}
          onSubmit={handleSubmit}
        />
      ) : testData ? (
        <Reading testData={testData} onSubmit={handleSubmit} ref={readingRef} />
      ) : (
        <div>Loading...</div>
      )}
      <Modal
        isOpen={showModal}
        onRequestClose={handleCancelFinish}
        contentLabel="Confirm Finish Reading"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Are you sure you want to finish the reading section?</h2>
        <div className="modal-buttons">
          <button onClick={handleConfirmFinish} className="btn-confirm">
            Yes
          </button>
          <button onClick={handleCancelFinish} className="btn-cancel">
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}
