import React from "react";

const Card = ({ children }) => {
  return (
    <div
      className={`flex flex-col p-2
            w-64 m-2 bg-red-700 text-white
            border-2 border-gray-900 rounded`}
    >
      {children}
    </div>
  );
};

export default Card;
