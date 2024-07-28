import React, { useEffect, useState } from "react";
import Axios from "axios";

const NewBattleForm = ({ user, battleLocs, battleNames, setPopupVis }) => {
  const [battle, setBattle] = useState("");
  const [country, setCountry] = useState("Afghanistan");
  const [latLon, setLatLon] = useState("");
  const [year, setYear] = useState(0);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  const submit = () => {
    addToBattleNames(country, battle);
    addToBattleLocation();
    addToHistory();
    addToUserContributions();

    setPopupVis(false);
  };

  const addToBattleNames = () => {
    battleNames[country].push(battle);
    console.log(battleNames[country]);
  };
  const addToBattleLocation = () => {
    const data = { latLon: latLon, year: year, addedBy: user._id };

    battleLocs[country][battle] = data;
  };
  const addToHistory = () => {
    const data = { latLon: latLon, year: year, addedBy: user._id, source: src };
  };

  return (
    <div className="flex flex-col items-center *:m-1">
      <h1>New Battle</h1>
      <h3>Country:</h3>
      <select name="country" onChange={(e) => setCountry(e.target.value)}>
        {Object.keys(battleLocs).map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <h3>Battle Name:</h3>
      <input
        type="text"
        value={battle}
        placeholder="Battle Name:"
        onChange={(e) => setBattle(e.target.value)}
      />
      <h3>Location:</h3>
      <p>Format: Latitude, Longitude </p>
      <input
        type="text"
        value={latLon}
        placeholder="Ex: 12, 49"
        onChange={(e) => setLatLon(e.target.value)}
      />
      <h3>Year:</h3>
      <p>Negative if before BC.</p>
      <input
        type="number"
        value={year}
        placeholder="Year:"
        onChange={(e) => setYear(e.target.value)}
      />
      <h3>Source:</h3>
      <textarea
        value={src}
        placeholder="Source:"
        onChange={(e) => setSrc(e.target.value)}
      />
      <button
        disabled={!battle || !country || !year || !src || !latLon}
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
};

export default NewBattleForm;
