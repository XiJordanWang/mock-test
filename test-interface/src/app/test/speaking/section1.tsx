import { useEffect, useRef, useState } from "react";
import { SectionProps, SpeakingDetials } from "../interface";
import { getQuestion, uploadAudio } from "@/api/speakingAPI";
import CountdownTimer from "./countdownTimer";
import Recorder from "recorder-js";

export default function Section1({ id }: SectionProps) {
  const firstAudioRef = useRef<HTMLAudioElement>(null);
  const secondAudioRef = useRef<HTMLAudioElement>(null);
  const thirdAudioRef = useRef<HTMLAudioElement>(null);
  const [speakingDetail, setSpeakingDetail] = useState<SpeakingDetials>();
  const [showElements, setShowElements] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState<number>(15);
  const [timerLabel, setTimerLabel] = useState<string>("PREPARATION TIME");
  const [timerColor, setTimerColor] = useState<string>("#E0E0E0");
  const [recorder, setRecorder] = useState<Recorder | null>(null);

  const fetchQuestions = async (id: number) => {
    const data = await getQuestion(id);
    setSpeakingDetail(data);
  };

  useEffect(() => {
    fetchQuestions(id);
  }, [id]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const secondAudio = secondAudioRef.current;

    if (secondAudio) {
      const handleSecondAudioEnd = () => {
        setTime(15);
        setStartTimer(true);
      };

      secondAudio.addEventListener("ended", handleSecondAudioEnd);

      return () => {
        secondAudio.removeEventListener("ended", handleSecondAudioEnd);
      };
    }
  }, [showElements]);

  const handleTimerEnd = () => {
    const thirdAudio = thirdAudioRef.current;
    if (time === 15) {
      setTime(45);
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
          uploadAudio(blob, id).catch((error) => {
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
  }, []);

  return (
    <div className="p-4 ml-60 mr-60 mt-20 h-screen">
      <div className="mt-20 mb-4 font-bold">{speakingDetail?.question}</div>
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
            Preparation Time: 15 Seconds
          </div>
          <div className="text-center font-bold">Response Time: 45 Seconds</div>
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