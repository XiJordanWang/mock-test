"use client";

import { useEffect, useState } from "react";
import Middle from "../middle";
import Direction from "./direction";
import Headers from "../header";
import { start } from "@/api/speakingAPI";
import { SpeakingTest } from "../interface";
import Section1 from "./section1";
import "./speaking.css";

export default function Page() {
  const [buttons, setButtons] = useState<string>("Listening");
  const [testData, setTestData] = useState<SpeakingTest>();
  const [isSection1, setIsSection1] = useState<boolean>(false);
  const [isDerection, setIsDerection] = useState<boolean>(true);

  const createTest = async () => {
    const data = await start();
    setTestData(data);
  };

  const handleEnded = () => {
    setIsSection1(true);
    setIsDerection(false);
  };

  useEffect(() => {
    createTest();
  }, []);

  return (
    <div className="page-container">
      <Headers buttons={buttons} />
      <div className="section-container">
        {isDerection && <Direction onEnded={handleEnded} />}
        {isSection1 && (
          <Section1 id={testData?.section1Id ? testData?.section1Id : 0} />
        )}
      </div>
    </div>
  );
}
