// ReadingContent.tsx
import React, { useEffect } from "react";
import parse from "html-react-parser";
import { ReadingReviewDTO } from "../interface";
import "./reading.css";

const squares = ["square1", "square2", "square3", "square4"];
interface ReadingContentProps {
  data: ReadingReviewDTO;
}

const ReadingContent: React.FC<ReadingContentProps> = ({ data }) => {
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
        let index = data.selections.find((item) => item.myAnswer)?.index;
        let correctIndex = data.selections.find(
          (item) => item.correctness
        )?.index;
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
            } else if (squareId === "square" + correctIndex) {
              squareElement.innerHTML = "";
              squareElement.appendChild(span);
              squareElement.className = "correct-sentence";
            } else {
              squareElement.className = "square";
            }
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
  }, [data]); // eslint-disable-line

  const processContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.context, "text/html");
    const paragraphs = doc.querySelectorAll("p");

    paragraphs.forEach((p, index) => {
      if (index + 1 === data.paragraphNum) {
        p.classList.add("paragraph-line");
        p.setAttribute("id", "focused-paragraph");
      } else {
        p.classList.remove("paragraph-line");
      }
    });
    return doc.body.innerHTML;
  };

  return (
    <div className="flex-1 bg-gray-100 border border-white rounded-lg overflow-y-auto p-4">
      <div className="tpo-article-box">
        <div className="tpo-article p-4" style={{ height: "700px" }}>
          <div
            className="article-title text-center font-bold"
            style={{ fontSize: "20px" }}
          >
            {data.heading}
          </div>
          <div className="article-content" style={{ fontSize: "20px" }}>
            {parse(processContent())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingContent;
