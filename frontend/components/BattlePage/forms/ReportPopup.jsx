import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ENDPOINT } from "../../../environment";

const Report = ({ battle, country, battleLocs, setPopupVis, user }) => {
  const [input, setInput] = useState("");

  const reportBattle = () => {
    const report = {
      country,
      battle: battle.name,
      reason: input,
      author: user._id,
    };
    Axios.post(`${ENDPOINT}/reportBattle`, report)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
    setPopupVis(false);
  };

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div className="*:my-2">
      <h1>Report</h1>
      <h2>{country}</h2>
      <h2>{battle.name}</h2>
      <h3>Including sources will result in your report be looked at sooner.</h3>
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
