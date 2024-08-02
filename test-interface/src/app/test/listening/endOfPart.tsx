import React from "react";

const EndOfPart = () => {
  return (
    <div className="p-4 ml-40 mr-40 mt-20 h-screen">
      <h1 className="text-3xl font-bold">End of Part</h1>
      <hr className="my-4 border-gray-400" />
      You have completed this part of the Listening section.
      <br /> Select <span className="font-bold">Next</span> to advance to the next part of the Listening section.
    </div>
  );
};

export default EndOfPart;
