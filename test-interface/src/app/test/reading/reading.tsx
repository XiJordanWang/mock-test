"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "../../../api/axiosConfig";
import Middle from "../middle";
import "./reading.css";
import { ApiResponse, ReadingProps } from "../interface";
import DragComponent from "./drag";
import parse from "html-react-parser";

const select = async (index: number, option: number) => {
  await axios.patch(`/reading/select/${index}/${option}`);
};

const squares = ["square1", "square2", "square3", "square4"];

const Reading = forwardRef((props: ReadingProps, ref) => {
  const { testData, onSubmit } = props;
  const [data, setData] = useState<ApiResponse | null>(null);
  const [mySelection, setMySelection] = useState<number | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    resetReading,
  }));

  const resetReading = () => {
    if (!lastId) return;
    const selectedItem = document.getElementById(lastId);
    if (selectedItem) {
      selectedItem.className = "selected";
    }
    if (data?.type === "INSERTION") {
      squares.forEach((item) => {
        let element = document.getElementById(item);
        if (element) {
          element.className = "square-default";
        }
      });
    }
  };

  const fetchData = useCallback(async () => {
    if (testData.index) {
      const response = await axios.get<ApiResponse>(
        `/reading/${testData.index}`
      );
      setData(response.data);
      if (response.data.mySelection !== null) {
        setMySelection(response.data.mySelection);
      }
    }
  }, [testData.index]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!data) return;

    const focusedParagraph = document.getElementById("focused-paragraph");
    if (focusedParagraph) {
      focusedParagraph.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    let id: string;
    switch (data.type) {
      case "VOCABULARY":
        id = "vocabulary" + data.sequence;
        break;
      case "REFER":
        id = "refer" + data.sequence;
        break;
      case "SENTENCE":
        id = "sentence" + data.sequence;
        break;
      case "INSERTION":
        let index =
          data.selections.findIndex((item) => item.id === data.mySelection) + 1;
        squares.forEach((squareId) => {
          const squareElement = document.getElementById(squareId);
          if (squareElement) {
            const span = document.createElement("span");
            span.textContent = data.question;
            span.style.fontWeight = "bold";
            if (squareId === "square" + index) {
              squareElement.innerHTML = "";
              squareElement.appendChild(span);
              squareElement.className = "inserted-sentence";
            } else {
              squareElement.className = "square";
            }
            squareElement.onclick = () => handleSquareClick(squareId);
          }
        });
        return;
      default:
        break;
    }

    const checkAndApplyStyles = () => {
      const vocabularySpan = document.getElementById(id);
      if (vocabularySpan) {
        vocabularySpan.className = "reading-selected";
      } else {
        setTimeout(checkAndApplyStyles, 100);
      }
    };
    checkAndApplyStyles();
    setLastId(id);
  }, [data]);

  const handleSquareClick = (squareId: string) => {
    let newSelection: number | null = null;
    switch (squareId) {
      case "square1":
        newSelection = data?.selections[0]?.id || null;
        break;
      case "square2":
        newSelection = data?.selections[1]?.id || null;
        break;
      case "square3":
        newSelection = data?.selections[2]?.id || null;
        break;
      case "square4":
        newSelection = data?.selections[3]?.id || null;
        break;
    }
    if (newSelection !== null) {
      setMySelection(newSelection);
      select(testData.index, newSelection);
    }
    const span = document.createElement("span");
    span.textContent = data?.question || "";
    span.style.fontWeight = "bold";
    squares.forEach((item) => {
      let square = document.getElementById(item);
      if (square) {
        if (item === squareId) {
          if (square.innerHTML === "") {
            square.appendChild(span);
            square.className = "inserted-sentence";
          }
        } else {
          square.className = "square";
          square.innerHTML = "";
        }
      }
    });
  };

  const handleOptionChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMySelection(parseInt(event.target.value));
    await select(testData.index, parseInt(event.target.value));
  };

  const processContent = (content: string, paragraphNum: number) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const paragraphs = doc.querySelectorAll("p");

    paragraphs.forEach((p, index) => {
      if (index + 1 === paragraphNum) {
        p.classList.add("paragraph-line");
        p.setAttribute("id", "focused-paragraph");
      } else {
        p.classList.remove("paragraph-line");
      }
    });
    return doc.body.innerHTML;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.type === "DRAG") {
    return (
      <>
        <Middle testData={testData} onSubmit={onSubmit} />
        <DragComponent data={data} />
      </>
    );
  }

  return (
    <>
      <Middle testData={testData} onSubmit={onSubmit} />
      <div className="flex h-[calc(100vh-64px)] p-4 gap-4">
        <div className="flex-1 bg-gray-100 border border-white rounded-lg overflow-y-auto p-4">
          <div className="tpo-article-box">
            <div className="tpo-article p-4" style={{ height: "495px" }}>
              <div
                className="article-title text-center font-bold"
                style={{ fontSize: "20px" }}
              >
                {data.heading}
              </div>
              <div className="article-content" style={{ fontSize: "20px" }}>
                {parse(processContent(data.context, data.paragraphNum))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start px-4">
          <div className="question-container p-4">
            {data.type !== "INSERTION" && (
              <h1 className="text-2xl font-bold">{data.question}</h1>
            )}
            {data.type === "INSERTION" && (
              <>
                <h1 className="text-2xl font-bold flex items-center">
                  Look at the four squares that indicate where the following
                  sentence could be added to the passage.
                </h1>
                <div className="p-4 mt-10 text-xl mb-10">{data.question}</div>
                <h1 className="text-2xl font-bold flex items-center">
                  Where would the sentence best fit? Select a square to add the
                  sentence to the passage.
                </h1>
              </>
            )}
            <div className="mt-4 text-lg">
              {data.type !== "INSERTION" &&
                data.selections.map((selection) => (
                  <div className="flex items-center mb-2" key={selection.id}>
                    <input
                      type="radio"
                      id={`option${selection.id}`}
                      name="question"
                      value={selection.id}
                      className="hidden"
                      checked={selection.id === mySelection}
                      onChange={handleOptionChange}
                    />
                    <label
                      htmlFor={`option${selection.id}`}
                      className="custom-radio"
                    >
                      <span className="radio-checkmark"></span>
                      <span style={{ fontSize: "20px" }}>
                        {selection.information}
                      </span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
Reading.displayName = "Reading";
export default Reading;
