// Header.tsx
import React from "react";
import { Disclosure } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SpeakerWaveIcon,
  QuestionMarkCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const buttons = [
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
import { HeaderProps } from "./interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ onNext, onBack }: HeaderProps) {
  return (
    <Disclosure as="nav" className="bg-[#0d6b6e]">
      <div className="mx-auto max-w-full px-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center pl-2">
            {/* Logo */}
            <img
              alt="Your Company"
              src="https://www.logo-designer.co/storage/2024/05/2024-english-language-test-toefl-new-logo-design.png"
              className="h-8 w-16"
            />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
            {buttons.map((button) => (
              <button
                key={button.name}
                type="button"
                onClick={
                  button.name === "Next"
                    ? onNext
                    : button.name === "Back"
                    ? onBack
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
                {button.icon && (
                  <button.icon aria-hidden="true" className="h-6 w-6 mr-2" />
                )}
                {button.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
