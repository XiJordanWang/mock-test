"use client";

import React, { useEffect, useState } from "react";
import ListeningSectionDirections from "./direction";
import Header from "../header";
import Listening from "./listening";
import Middle from "../middle";
import Question from "./question";
import { next, start } from "@/api/listeningAPI";
import { ListeningTest } from "../interface";

const Page: React.FC = () => {
  const [buttons, setButtons] = useState<string>("ListeningDirections");
  const [testData, setTestData] = useState<ListeningTest>();
  const [isDirection, setIsDirection] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<boolean>(false);

  const handdleBegin = async () => {
    setButtons("Listening");
    setIsDirection(false);
    setIsListening(true);
    const data = await start();
    setTestData(data);
  };

  const handdleSubmitted = () => {};

  const handdleEnd = () => {
    setIsListening(false);
    setIsQuestion(true);
    setButtons("ListeningQuestions");
  };

  const handdleNext = async () => {
    const data = await next();
    setTestData(data);
  };

  useEffect(() => {
    console.log(testData?.currentListeningId);
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
            remainTime={
              testData?.remainTime ? testData?.remainTime : 6 * 30 + 30
            }
            index={testData?.index ? testData?.index : 0}
            total={testData?.total ? testData?.total : 0}
            onSubmit={handdleSubmitted}
            isListening={isListening}
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
            />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
