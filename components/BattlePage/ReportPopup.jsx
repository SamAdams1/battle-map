import React, { useState } from "react";
import Axios from "axios";

const Report = ({ battle, country, battleLocs, setPopupVis, user }) => {
  const [input, setInput] = useState("");

  const reportBattle = () => {
    const report = { country, battle, reason: input, author: user._id };
    Axios.post("http://localhost:3005/reportBattle", report)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
    setPopupVis(false);
  };

  return (
    <div>
      <h1>Report</h1>
      <h2>{country}</h2>
      <h2>{battle}</h2>
      <h3>Sources will make your report be looked at sooner.</h3>
      <textarea
        type="text"
        placeholder="Reason"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[20em]"
      />
      <button onClick={() => setPopupVis(false)}>Cancel</button>
      <button onClick={reportBattle}>Submit</button>
    </div>
  );
};

export default Report;
