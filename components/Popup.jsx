import React from "react";

const Popup = ({ children, setVis }) => {
  return (
    <div className="z-50 fixed bg-white w-full h-full -translate-y-14">
      <button onClick={() => setVis(false)}>X</button>
      {children}
    </div>
  );
};

export default Popup;
