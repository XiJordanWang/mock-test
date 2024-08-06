"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Middle from "../middle";
import Direction from "./direction";
import Headers from "../header";
import { start } from "@/api/speakingAPI";
import { SpeakingTest } from "../interface";
import Section from "./section";
import "./speaking.css";
import Modal from "./Modal";
import Listening from "./Listening";

export default function Page() {
  const router = useRouter();
  const [buttons, setButtons] = useState<string>("Listening");
  const [testData, setTestData] = useState<SpeakingTest>();
  const [sectionId, setSectionId] = useState<number>(0);
  const [isSection, setIsSection] = useState<boolean>(false);
  const [isDerection, setIsDerection] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);
  const [readingTime, setReadingTime] = useState<number>(50);
  const [isHiddenTime, setIsHiddenTime] = useState<boolean>(true);
  const [showListening, setShowListening] = useState<boolean>(false);
  const [showArticle, setShowArticle] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const createTest = async () => {
    const data = await start();
    setTestData(data);
    setSectionId(data.section1Id);
  };

  const handleEnded = () => {
    setIsSection(true);
    setIsDerection(false);
    if (section === 4) {
      console.log("Task 4");
      setShowListening(true);
      setIsListening(true);
    }
  };

  useEffect(() => {
    createTest();
  }, []);

  useEffect(() => {
    if (section === 2) {
      setSectionId(testData?.section2Id ? testData?.section2Id : 0);
      setShowArticle(true);
      setReadingTime(50);
    } else if (section === 3) {
      setSectionId(testData?.section3Id ? testData?.section3Id : 0);
      setShowArticle(true);
      setReadingTime(50);
    } else if (section === 4) {
      setSectionId(testData?.section4Id ? testData?.section4Id : 0);
    }
  }, [section]);

  const handdleUploadEnded = () => {
    setShowModal(true);
  };

  const handdleNextSection = () => {
    setIsDerection(true);
    setIsSection(false);
    if (section === 4) {
      router.push("/test/writing");
      return;
    }
    setSection((pre) => pre + 1);
  };

  const handdleSubmit = () => {
    setShowListening(true);
    setIsHiddenTime(true);
  };

  const handleReading = () => {
    setIsHiddenTime(false);
  };

  const handleListeningEnded = () => {
    setShowListening(false);
    setShowArticle(false);
    if (section === 4) {
      setIsListening(false);
    }
  };

  return (
    <div className="page-container">
      <Headers buttons={buttons} />
      {isSection && (
        <Middle
          type="Speaking"
          remainTime={readingTime}
          index={section}
          total={4}
          onSubmit={handdleSubmit}
          isHiddenTime={isHiddenTime}
        />
      )}
      {showListening && (
        <Listening
          path={"http://localhost:8080/files/SPEAKING_LISTENING/" + sectionId}
          onListeningEnded={handleListeningEnded}
        />
      )}
      <div className="section-container">
        {isDerection && <Direction onEnded={handleEnded} section={section} />}
        {isSection && (
          <Section
            id={sectionId}
            section={section}
            onUploadEnded={handdleUploadEnded}
            onReading={handleReading}
            showArticle={showArticle}
            isListening={isListening}
          />
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Stop Speaking"
        onNextSection={handdleNextSection}
      >
        <hr></hr>
        <p className="p-4">
          Response time has ended. Please wait, we are currently saving your
          response.
        </p>
      </Modal>
    </div>
  );
}
