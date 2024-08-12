import React from "react";

const Wiki = ({ text }) => {
  return (
    <div className="flex flex-col  px-8 top-0 absolute bottom-0 right-0 left-0 overflow-y-auto">
      <h1>Wiki</h1>
      <div>
        <p className="max-w-[50em]  leading-loose">{text}</p>
      </div>
    </div>
  );
};

export default Wiki;
