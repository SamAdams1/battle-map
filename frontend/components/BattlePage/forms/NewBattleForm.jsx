import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  getCurrentDate,
  postToHistory,
  searchNamesForYear,
  updateCountryBattleLocs,
  updateNameList,
  updateUserContributions,
} from "./dbFuncs";

const NewBattleForm = ({ user, country, battleLocs, setPopupVis }) => {
  const [battle, setBattle] = useState("");
  const [latLon, setLatLon] = useState("");
  const [year, setYear] = useState(0);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  const submit = () => {
    setYear(parseInt(year));
    const index = searchNamesForYear(battleLocs, year);
    let name = `${battle} – ${year}`;
    let a = latLon.split(",").map((l) => parseFloat(l));
    const data = {
      name: name,
      latLon: a,
      year: parseInt(year),
      addedBy: user._id,
    };
    battleLocs.splice(index, 0, data);

    // console.log(battle, country, year);
    updateCountryBattleLocs(country, battleLocs);
    addToHistory();
    addToUserContributions();

    setPopupVis(false);
  };

  const addToHistory = () => {
    const data = {
      country,
      battle,
      latLon: latLon.split(","),
      year: parseInt(year),
      dateAdded: getCurrentDate(),
      source: src,
      addedBy: user._id,
      approved: user.perms.addNewBattle,
    };

    postToHistory(data);
  };

  const addToUserContributions = () => {
    const data = { country, battle, dateAdded: getCurrentDate() };
    user.contributions.push(data);

    updateUserContributions(user._id, user.contributions);
  };

  return (
    <div className="flex flex-col items-center *:m-1">
      <h1>New Battle</h1>
      <h3>Country: {country}</h3>
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
