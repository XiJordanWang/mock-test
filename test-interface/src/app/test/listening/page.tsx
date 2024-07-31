"use client";

import React, { useState } from "react";
import ListeningSectionDirections from "./direction";
import Header from "../header";
import Listening from "./listening";
import Middle from "../middle";
import Question from "./question";

const Page: React.FC = () => {
  const [buttons, setButtons] = useState<string>("ListeningDirections");
  const [isDirection, setIsDirection] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isQuestion, setIsQuestion] = useState<boolean>(false);

  const handdleBegin = () => {
    setButtons("Listening");
    setIsDirection(false);
    setIsListening(true);
  };

  const handdleSubmitted = () => {};

  const handdleEnd = () => {
    setIsListening(false);
    setIsQuestion(true);
  };

  return (
    <>
      <div className="h-screen overflow-hidden flex flex-col">
        <Header buttons={buttons} onBegin={handdleBegin} />
        {isDirection && <ListeningSectionDirections />}
        {!isDirection && (
          <Middle
            type="Listening"
            remainTime={60 * 6 + 30}
            index={0}
            total={10}
            onSubmit={handdleSubmitted}
            isListening={isListening}
          />
        )}
        {isListening && (
          <>
            <Listening onListeningEnded={handdleEnd} />
          </>
        )}
        {isQuestion && (
          <>
            <Question />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
