import { useEffect, useRef, useState } from "react";
import { SectionProps, SpeakingDetials } from "../interface";
import { getQuestion, uploadAudio } from "@/api/speakingAPI";
import CountdownTimer from "./countdownTimer";
import Recorder from "recorder-js";

export default function Section({
  id,
  section,
  onUploadEnded,
  onReading,
  showArticle,
  isListening,
}: SectionProps) {
  const firstAudioRef = useRef<HTMLAudioElement>(null);
  const secondAudioRef = useRef<HTMLAudioElement>(null);
  const thirdAudioRef = useRef<HTMLAudioElement>(null);
  const studentsListerRef = useRef<HTMLAudioElement>(null);
  const [speakingDetail, setSpeakingDetail] = useState<SpeakingDetials>();
  const [showElements, setShowElements] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [timerLabel, setTimerLabel] = useState<string>("PREPARATION TIME");
  const [timerColor, setTimerColor] = useState<string>("#E0E0E0");
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [prepareTime, setPrepareTime] = useState<number>(15);
  const [responseTime, setResponseTime] = useState<number>(45);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  const fetchQuestions = async (id: number) => {
    const data = await getQuestion(id);
    setSpeakingDetail(data);
  };

  useEffect(() => {
    fetchQuestions(id);
  }, [id]);

  useEffect(() => {
    if (section === 1) {
      setTime(15);
      setPrepareTime(15);
      setResponseTime(45);
    } else if (section === 2) {
      setTime(30);
      setPrepareTime(30);
      setResponseTime(60);
    } else if (section === 3) {
      setTime(30);
      setPrepareTime(30);
      setResponseTime(60);
    } else if (section === 4) {
      setTime(20);
      setPrepareTime(20);
      setResponseTime(60);
    }
  }, [section]);

  useEffect(() => {
    if (showArticle) {
      const studentsAudio = studentsListerRef.current;

      if (studentsAudio) {
        const handleStudentsAudioEnd = () => {
          onReading();
          setIsBlurred(false); // Remove blur effect after audio ends
        };

        setIsBlurred(true); // Apply blur effect
        studentsAudio.addEventListener("ended", handleStudentsAudioEnd);
        studentsAudio.play().catch((error) => {
          console.error("Failed to play students audio:", error);
        });

        return () => {
          studentsAudio.removeEventListener("ended", handleStudentsAudioEnd);
        };
      }
    }
  }, [showArticle]); // eslint-disable-line

  useEffect(() => {
    if (showArticle) {
      return;
    }
    if (isListening) {
      return;
    }
    const firstAudio = firstAudioRef.current;
    const secondAudio = secondAudioRef.current;
    if (firstAudio) {
      const handleFirstAudioEnd = () => {
        setShowElements(true);
        if (secondAudio) {
          secondAudio.play().catch((error) => {
            console.error("Failed to play second audio:", error);
          });
        }
      };

      firstAudio.addEventListener("ended", handleFirstAudioEnd);

      firstAudio.play().catch((error) => {
        console.error("Failed to play first audio:", error);
      });

      return () => {
        firstAudio.removeEventListener("ended", handleFirstAudioEnd);
      };
    }
  }, [showArticle, isListening]);

  useEffect(() => {
    if (showArticle) {
      return;
    }
    const secondAudio = secondAudioRef.current;

    if (secondAudio) {
      const handleSecondAudioEnd = () => {
        setTime(prepareTime);
        setStartTimer(true);
      };

      secondAudio.addEventListener("ended", handleSecondAudioEnd);

      return () => {
        secondAudio.removeEventListener("ended", handleSecondAudioEnd);
      };
    }
  }, [showElements]); // eslint-disable-line

  const handleTimerEnd = () => {
    if (showArticle) {
      return;
    }
    const thirdAudio = thirdAudioRef.current;
    if (time === prepareTime) {
      setTime(responseTime);
      setStartTimer(false);
      setTimerLabel("RESPONSE TIME");
      setTimerColor("#0D6B6E");
      if (thirdAudio) {
        thirdAudio.play().catch((error) => {
          console.error("Failed to play third audio:", error);
        });
      }
    } else {
      stopRecording();
    }
  };

  const handleThirdAudioEnd = () => {
    setStartTimer(true);
    startRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const newRecorder = new Recorder(audioContext);

      newRecorder
        .init(stream)
        .then(() => {
          newRecorder.start().then(() => {
            setRecorder(newRecorder);
          });
        })
        .catch((error) => {
          console.error("Failed to start recording:", error);
        });
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    if (recorder) {
      recorder
        .stop()
        .then(({ blob }) => {
          console.log("Audio blob:", blob);
          uploadAudio(blob, id)
            .then(() => {
              onUploadEnded();
            })
            .catch((error) => {
              console.error("Failed to upload audio:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to stop recording:", error);
        });
    }
  };

  useEffect(() => {
    const thirdAudio = thirdAudioRef.current;

    if (thirdAudio) {
      thirdAudio.addEventListener("ended", handleThirdAudioEnd);

      return () => {
        thirdAudio.removeEventListener("ended", handleThirdAudioEnd);
      };
    }
  }, []); // eslint-disable-line

  return (
    <div
      className={`p-4 ml-60 mr-60 mt-20 h-screen ${isBlurred ? "blur" : ""}`}
    >
      {showArticle && (
        <>
          <audio ref={studentsListerRef} src={"/Students Letter.m4a"} />
          {!isBlurred && (
            <>
              <div>Reading Time: 50 seconds</div>
              <div className="font-bold mt-10 mb-5">
                {speakingDetail?.title}
              </div>
              <div>{speakingDetail?.reading}</div>
            </>
          )}
        </>
      )}
      {!showArticle && (
        <>
          <div className="mt-20 mb-4 font-bold">{speakingDetail?.question}</div>
        </>
      )}
      <audio
        ref={firstAudioRef}
        src={"http://localhost:8080/files/SPEAKING_QUESTION/" + id}
      />
      <audio ref={secondAudioRef} src={"/Prepare.m4a"} />
      <audio ref={thirdAudioRef} src={"/Speaking.m4a"} />
      {showElements && (
        <>
          <hr className="mt-20 mb-10 ml-20 mr-20 my-4 border-gray-400" />
          <div className="text-center font-bold">
            Preparation Time: {prepareTime} Seconds
          </div>
          <div className="text-center font-bold">
            Response Time: {responseTime} Seconds
          </div>
          <CountdownTimer
            duration={time}
            start={startTimer}
            onTimerEnd={handleTimerEnd}
            label={timerLabel}
            color={timerColor}
          />
        </>
      )}
    </div>
  );
}
