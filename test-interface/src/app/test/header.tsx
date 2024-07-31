// Header.tsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Button, HeaderProps } from "./interface";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SpeakerWaveIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const readingButtons = [
  { name: "Volume", icon: SpeakerWaveIcon },
  { name: "Help", icon: QuestionMarkCircleIcon },
  { name: "Review", icon: BookmarkIcon },
  { name: "Back", icon: ArrowLeftIcon },
  {
    name: "Next",
    icon: ArrowRightIcon,
    backgroundColor: "white",
    textColor: "text-[#027f80]",
  },
];

const reviewButtons = [
  { name: "Return", icon: ArrowLeftIcon },
  {
    name: "Back To Question",
    icon: ArrowRightIcon,
    backgroundColor: "white",
    textColor: "text-[#027f80]",
  },
];

const listeningDirectionsButtons = [
  { name: "Volume", icon: SpeakerWaveIcon },
  {
    name: "Begin",
    icon: ArrowRightIcon,
    backgroundColor: "white",
    textColor: "text-[#027f80]",
  },
];

const listeningButtons = [{ name: "Volume", icon: SpeakerWaveIcon }];

export default function Header({
  onNext,
  onBack,
  onReview,
  onReturn,
  onBackToQuestion,
  onBegin,
  buttons,
}: HeaderProps) {
  const renderButtons = (buttonsArray: Button[]) => {
    return buttonsArray.map((button) => (
      <button
        key={button.name}
        type="button"
        onClick={
          button.name === "Next"
            ? onNext
            : button.name === "Back"
            ? onBack
            : button.name === "Review"
            ? onReview
            : button.name === "Return"
            ? onReturn
            : button.name === "Back To Question"
            ? onBackToQuestion
            : button.name === "Begin"
            ? onBegin
            : undefined
        } // Call onBack for Back button and onNext for Next button
        className={classNames(
          `relative flex items-center rounded-full border-2 border-white px-4 py-2 font-bold`,
          button.backgroundColor ? "bg-white" : "bg-[#0D6B6E]",
          button.textColor || "text-gray-300",
          "hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#027f80]"
        )}
      >
        <span className="sr-only">{button.name}</span>
        {React.createElement(button.icon, {
          "aria-hidden": true,
          className: "h-6 w-6 mr-2",
        })}
        {button.name}
      </button>
    ));
  };

  let buttonsToRender;
  if (buttons === "Reading") {
    buttonsToRender = renderButtons(readingButtons);
  } else if (buttons === "Review") {
    buttonsToRender = renderButtons(reviewButtons);
  } else if (buttons === "ListeningDirections") {
    buttonsToRender = renderButtons(listeningDirectionsButtons);
  } else if (buttons === "Listening") {
    buttonsToRender = renderButtons(listeningButtons);
  } else {
    buttonsToRender = renderButtons(readingButtons);
  }

  return (
    <Disclosure as="nav" className="bg-[#0d6b6e]">
      <div className="mx-auto max-w-full px-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
            {buttonsToRender}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
