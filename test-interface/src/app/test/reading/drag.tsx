import React, { useState, useEffect } from "react";
import { ApiResponse } from "../interface";
import { multipleSelect } from "@/api/readingAPI";

// 类型定义
interface Selection {
  id: number;
  information: string;
  selected: boolean;
}

const DragComponent: React.FC<{ data: ApiResponse; index: number }> = ({
  data,
  index,
}) => {
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedItems, setDroppedItems] = useState<{
    [key: string]: number | null;
  }>({
    box1: null,
    box2: null,
    box3: null,
  });
  const [successfullyDropped, setSuccessfullyDropped] =
    useState<boolean>(false);

  const [availableChoices, setAvailableChoices] = useState<Selection[]>(
    data.selections
  );

  useEffect(() => {
    const selctions = data.mySelections;
    if (!selctions) {
      return;
    }
    if (selctions.length > 0) {
      droppedItems["box1"] = data.mySelections[0];
      const element = document.getElementById(data.mySelections[0].toString());
      if (element) {
        element.style.color = "#FFFFFF";
      }
    }
    if (selctions.length > 1) {
      droppedItems["box2"] = data.mySelections[1];
      const element = document.getElementById(data.mySelections[1].toString());
      if (element) {
        element.style.color = "#FFFFFF";
      }
    }
    if (selctions.length > 2) {
      droppedItems["box3"] = data.mySelections[2];
      const element = document.getElementById(data.mySelections[2].toString());
      if (element) {
        element.style.color = "#FFFFFF";
      }
    }
  }, [data]); // eslint-disable-line

  useEffect(() => {
    const mySelections = Object.values(droppedItems).filter(
      (value) => value !== null
    );
    if (mySelections.length > 0) {
      multipleSelect(index, mySelections);
    }
  }, [droppedItems]); // eslint-disable-line

  const handleDragStart = (id: number) => {
    setDraggedItemId(id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (draggedItemId) {
      const element = document.getElementById(draggedItemId.toString());
      if (element) {
        element.style.color = successfullyDropped ? "#FFFFFF" : "black";
      }
    }
    setDraggedItemId(null);
    setSuccessfullyDropped(false); // Reset the flag
  };

  const handleDrop = (boxId: string) => {
    if (draggedItemId !== null) {
      const currentDroppedItem = droppedItems[boxId];

      if (currentDroppedItem !== null) {
        // Move the current item back to the available choices
        setAvailableChoices((prev) =>
          prev.map((item) =>
            item.id === currentDroppedItem ? { ...item, selected: false } : item
          )
        );
        const element = document.getElementById(currentDroppedItem.toString());
        if (element) {
          element.style.color = "black"; // Restore color of the moved item
        }
      }

      // Place the dragged item into the box
      setDroppedItems((prev) => ({
        ...prev,
        [boxId]: draggedItemId,
      }));
      setAvailableChoices((prev) =>
        prev.map((item) =>
          item.id === draggedItemId ? { ...item, selected: true } : item
        )
      );

      setSuccessfullyDropped(true); // Mark as successfully dropped
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBoxClick = (boxId: string) => {
    const itemId = droppedItems[boxId];
    if (itemId !== null) {
      setDroppedItems((prev) => ({
        ...prev,
        [boxId]: null,
      }));
      setAvailableChoices((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, selected: false } : item
        )
      );
      const element = document.getElementById(itemId.toString());
      if (element) {
        element.style.color = "black";
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] p-4 gap-4">
      <div className="flex-1 bg-gray-100 border border-white rounded-2xl overflow-y-auto p-4">
        <div className="font-bold mb-4 text-center">
          Directions: An introductory sentence for a brief summary of the
          passage is provided below. Complete the summary by selecting the THREE
          answer choices that express the most important ideas in the passage.
          Some sentences do not belong in the summary because they express ideas
          that are not presented in the passage or are minor ideas in the
          passage. This question is worth 2 points.
        </div>
        <div
          className="bg-[#ccf5f7] rounded-2xl p-4 mb-4 text-center"
          style={{ marginLeft: "50px", marginRight: "50px" }}
        >
          Drag your choices to the spaces where they belong. To review the
          passage, select <span className="font-bold">View Passage.</span>
        </div>
        <div className="font-bold text-center mb-4">{data.question}</div>
        {["box1", "box2", "box3"].map((boxId) => (
          <div
            key={boxId}
            className="border border-black rounded-2xl mb-4"
            style={{
              height: "50px",
              marginLeft: "150px",
              marginRight: "150px",
            }}
            onDrop={() => handleDrop(boxId)}
            onDragOver={handleDragOver}
            onClick={() => handleBoxClick(boxId)}
          >
            {droppedItems[boxId] !== null && (
              <div className="bg-[#0D6B6E] text-white p-2 rounded-2xl">
                {
                  availableChoices.find(
                    (item) => item.id === droppedItems[boxId]
                  )?.information
                }
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 font-bold text-center">Answer Choices</div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {availableChoices.map((choice) => (
            <div
              id={choice.id.toString()}
              key={choice.id}
              className={`flex items-start p-2 border border-gray-300 rounded-2xl bg-white ${
                choice.id === draggedItemId && isDragging ? "opacity-50" : ""
              }`}
              draggable={!choice.selected}
              onDragStart={() => handleDragStart(choice.id)}
              onDragEnd={handleDragEnd}
              style={{
                position: "relative",
                color: "black", // Default color
              }}
            >
              <div className="flex-1">{choice.information}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragComponent;
