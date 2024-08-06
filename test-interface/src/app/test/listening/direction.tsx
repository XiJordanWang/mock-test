// ListeningSectionDirections.tsx
import React from "react";

const ListeningSectionDirections: React.FC = () => {
  return (
    <div className="p-4 ml-40 mr-40 mt-20 h-screen">
      <h1 className="text-2xl font-bold mb-8">Listening Section Directions</h1>
      <hr className="my-4 border-gray-400" />
      <p className="mb-4">
        In this section, you will be able to demonstrate your ability to
        understand conversations and lectures in English. The section is divided
        into two separately timed parts. You will hear each conversation or
        lecture only one time.
      </p>
      <p className="mb-4">
        A clock will indicate how much time remains. The clock will count down
        only while you are answering questions, not while you are listening.
      </p>
      <p className="mb-4">
        In some questions, you will see this icon: see, part of the question.
        This means that you will hear, but not
      </p>
      <p className="mb-4">
        You must answer each question. After you answer, select{" "}
        <span className="font-bold">Next</span>. You cannot return to previous
        questions
      </p>
    </div>
  );
};

export default ListeningSectionDirections;
