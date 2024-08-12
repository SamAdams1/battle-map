import React from "react";

const Popup = ({ children, setVis }) => {
  return (
    <div className="z-50 fixed bg-slate-400 w-full h-full translate-x-2">
      <button
        onClick={() => setVis(false)}
        className="p-3 absolute right-4 z-50"
      >
        X
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Popup;
