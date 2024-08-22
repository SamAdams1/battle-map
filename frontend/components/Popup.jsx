import React from "react";

const Popup = ({ children, setVis }) => {
  return (
    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-slate-400">
      <button
        onClick={() => setVis(false)}
        className="p-3 absolute right-0 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Popup;
