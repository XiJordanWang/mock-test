"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Direction from "./Direction";
import Header from "../header";
import Middle from "../middle";
import "./writing.css";
import IntegratedWriting from "./IntegratedWriting";
import Listening from "./Listening";
import { finish, start, updateMyWriting } from "@/api/writingAPI";
import { WritingTest } from "../interface";
import AcademicDiscussion from "./AcademicDiscussion";

const Page = () => {
  const router = useRouter();
  const [headerType, setHeaderType] = useState<string>("WritingDirection");
  const [isDirection, setDirection] = useState<boolean>(true);
  const [isIntegrated, setIsIntegrated] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [isHiddenTime, setIsHiddenTime] = useState<boolean>(true);
  const [isDisable, setDisale] = useState<boolean>(true);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [isListening, setListening] = useState<boolean>(false);
  const [isDiscussion, setIsDiscussion] = useState<boolean>(false);
  const [remainTime, setRemainTime] = useState<number>(3 * 60);
  const [index, setIndex] = useState<number>(1);
  const [testData, setTestData] = useState<WritingTest>();
  const [myWriting, setMyWriting] = useState<string>("");

  const handleSubmit = () => {
    if (isDiscussion) {
      finishWriting();
      return;
    }
    if (isWriting) {
      finishIntegratedWriting();
      return;
    }
    setListening(true);
    setIsIntegrated(false);
    setIsPause(true);
    setIsHiddenTime(true);
  };

  const handleCountinue = async () => {
    if (!isDirection) {
      console.log("click");
      return;
    }
    const data = await start();
    setTestData(data);
    setDirection(false);
    setIsIntegrated(true);
    setIsPause(false);
    setIsHiddenTime(false);
  };

  const handleListeningEnded = () => {
    setListening(false);
    setIsIntegrated(true);
    setRemainTime(60 * 20);
    setIsPause(false);
    setIsHiddenTime(false);
    setDisale(false);
    setHeaderType("Writing");
    setIsWriting(true);
  };

  const handleNext = () => {
    if (isIntegrated) {
      finishIntegratedWriting();
    }
    if (isDiscussion) {
      finishWriting();
      return;
    }
  };

  const finishIntegratedWriting = () => {
    updateMyWriting(
      testData?.integratedId ? testData?.integratedId : 0,
      myWriting
    );
    setIsIntegrated(false);
    setIndex(2);
    setIsDiscussion(true);
    setRemainTime(10 * 60);
    setIsPause(false);
    setIsHiddenTime(false);
  };

  const finishWriting = () => {
    updateMyWriting(
      testData?.discussionId ? testData?.discussionId : 0,
      myWriting
    );
    finish();
    router.push("/");
  };

  const handleTextChange = (text: string) => {
    setMyWriting(text);
  };

  return (
    <div className="page-container">
      <Header
        buttons={headerType}
        onCountinue={handleCountinue}
        onNext={handleNext}
      />
      {!isDirection && (
        <Middle
          type="Writing"
          remainTime={remainTime}
          index={index}
          total={2}
          onSubmit={handleSubmit}
          isPause={isPause}
          isHiddenTime={isHiddenTime}
        />
      )}
      {isDirection && <Direction />}
      {isIntegrated && (
        <IntegratedWriting
          isDisable={isDisable}
          id={testData?.integratedId ? testData.integratedId : 0}
          onTextChange={handleTextChange}
        />
      )}
      {isListening && (
        <Listening
          path={
            "http://localhost:8080/files/INTEGRATED_WRITING/" +
            testData?.integratedId
          }
          onListeningEnded={handleListeningEnded}
        />
      )}
      {isDiscussion && (
        <AcademicDiscussion
          id={testData?.discussionId ? testData?.discussionId : 0}
          onTextChange={handleTextChange}
        />
      )}
    </div>
  );
};

export default Page;
