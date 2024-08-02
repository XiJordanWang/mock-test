"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ListeningSectionDirections from "./direction";
import Header from "../header";
import Listening from "./listening";
import Middle from "../middle";
import Question from "./question";
import { next, start } from "@/api/listeningAPI";
import { ListeningTest } from "../interface";
import EndOfPart from "./endOfPart";

const Page: React.FC = () => {
  const router = useRouter();
  const [buttons, setButtons] = useState<string>("ListeningDirections");
  const [testData, setTestData] = useState<ListeningTest>();
  const [remainTime, setRemainTime] = useState<number>(60 * 6 + 30);
  const [isDirection, setIsDirection] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<boolean>(false);
  const [isEndedOfPart, setIsEndedOfPart] = useState<boolean>(false);

  const handdleBegin = async () => {
    setButtons("Listening");
    setIsDirection(false);
    setIsListening(true);
    setIsPause(true);
    const data = await start();
    setTestData(data);
  };

  const handdleSubmitted = () => {
    router.push("/test/speaking");
  };

  const handdleEnd = () => {
    setIsListening(false);
    setIsQuestion(true);
    setIsPause(false);
    setButtons("ListeningQuestions");
  };

  const handdleNext = async () => {
    if (
      isEndedOfPart === false &&
      testData?.currentSection === "section1" &&
      testData?.index === 11
    ) {
      setIsEndedOfPart(true);
      setIsQuestion(false);
      setIsPause(true);
      setRemainTime(60 * 10);
      return;
    }
    if (testData?.currentSection === "section2" && testData?.index === 17) {
      console.log("finish listening section!");
      handdleSubmitted();
      return;
    }
    setIsEndedOfPart(false);
    const data = await next();
    setIsPause(true);
    setTestData(data);
  };

  const handdlePause = () => {
    setIsPause(false);
  };

  useEffect(() => {
    if (testData?.currentListeningId) {
      setButtons("Listening");
      setIsDirection(false);
      setIsQuestion(false);
      setIsListening(true);
    }
  }, [testData?.currentListeningId]);

  return (
    <>
      <div className="h-screen overflow-hidden flex flex-col">
        <Header buttons={buttons} onBegin={handdleBegin} onNext={handdleNext} />
        {isDirection && <ListeningSectionDirections />}
        {!isDirection && (
          <Middle
            type="Listening"
            remainTime={remainTime}
            index={testData?.index ? testData?.index : 0}
            total={testData?.total ? testData?.total : 0}
            onSubmit={handdleSubmitted}
            isPause={isPause}
          />
        )}
        {isListening && (
          <>
            <Listening
              onListeningEnded={handdleEnd}
              path={
                "http://localhost:8080/files/LISTENING/" +
                testData?.currentListeningId
              }
            />
          </>
        )}
        {isQuestion && (
          <>
            <Question
              questionId={
                testData?.currentQuestionId ? testData?.currentQuestionId : 0
              }
              onEnded={handdlePause}
            />
          </>
        )}
        {isEndedOfPart && <EndOfPart />}
      </div>
    </>
  );
};

export default Page;
