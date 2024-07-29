import React, { useState } from "react";

const choices = [
  "Conditions on Earth are generally favorable to life, but aspects of our planet result in temperature variations that require organisms to regulate body temperature.",
  "Adaptations to cold include both insulating the body with hair or feathers and preventing heat loss through increased body volume relative to surface area.",
  "Antifreeze proteins have been found to be more effective in protecting simpler organisms than more complex organisms against freezing temperatures in the lakes of Antarctica.",
  "Some organisms have the ability to regulate body temperature throughout the day by altering their size in response to the spin of Earth and the angle from which sunlight strikes it.",
  "An organism can survive freezing temperatures by replacing water in its body with substances that have lower freezing points or by covering ice crystals with antifreeze proteins.",
  "Tardigrades prevent damage from ice crystals by strengthening cell walls with trehalose and by lying dormant without body fluids until above-freezing temperatures return.",
];

const DragComponent = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<{
    [key: string]: string | null;
  }>({
    box1: null,
    box2: null,
    box3: null,
  });
  const [availableChoices, setAvailableChoices] = useState(choices);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (boxId: string) => {
    if (draggedItem) {
      setDroppedItems((prev) => ({
        ...prev,
        [boxId]: draggedItem,
      }));
      setAvailableChoices((prev) =>
        prev.filter((choice) => choice !== draggedItem)
      );
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBoxClick = (boxId: string) => {
    const item = droppedItems[boxId];
    if (item) {
      setDroppedItems((prev) => ({
        ...prev,
        [boxId]: null,
      }));
      setAvailableChoices((prev) => [...prev, item]);
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
          className="bg-sky-100 rounded-2xl p-4 mb-4 text-center"
          style={{ marginLeft: "50px", marginRight: "50px" }}
        >
          Drag your choices to the spaces where they belong. To review the
          passage, select <span className="font-bold">View Passage.</span>
        </div>
        <div className="font-bold text-center mb-4">
          Earth's climate is generally favorable for life, but organisms must be
          able to deal with temperature variations.
        </div>
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
            {droppedItems[boxId] && (
              <div className="bg-[#0D6B6E] text-white p-2 rounded-2xl">
                {droppedItems[boxId]}
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 font-bold text-center">Answer Choices</div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {availableChoices.map((choice, index) => (
            <div
              key={index}
              className="flex items-start p-2 border border-gray-300 rounded-2xl bg-white"
              draggable
              onDragStart={() => handleDragStart(choice)}
            >
              <div className="flex-1">{choice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragComponent;
