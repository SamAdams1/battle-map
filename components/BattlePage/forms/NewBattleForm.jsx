import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  getCurrentDate,
  postToHistory,
  updateCountryBattleLocs,
  updateNameList,
  updateUserContributions,
} from "./dbFuncs";

const NewBattleForm = ({
  user,
  country,
  battleLocs,
  battleNames,
  setPopupVis,
}) => {
  const [battle, setBattle] = useState("");
  const [latLon, setLatLon] = useState("");
  const [year, setYear] = useState(0);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  const submit = () => {
    const index = searchNameForYear();
    let name = `${battle} – ${year}`;

    battleNames.splice(index, 0, name);

    // console.log(battle, country, year);
    updateNameList(country, battleNames);
    addToBattleLocation();
    addToHistory();
    addToUserContributions();

    setPopupVis(false);
  };

  function searchNameForYear() {
    let largerYear;
    let largerIndex = -1;
    for (let index = 0; index < battleNames.length; index++) {
      const bStr = battleNames[index];
      let bArr = bStr.split(" – ");
      let thisYear;
      try {
        // check if battle has loc as then it will have year
        thisYear = String(battleLocs[bArr[0]].year);
      } catch {
        // if has dash search for year
        if (bArr.length >= 2) {
          thisYear = searchSecondPart(bArr[1].split(" or ")[0].split(",")[0]);
        } else {
          // if not search battle name for year
          thisYear = extractYear(bStr);
        }
      }
      // console.log(thisYear, bStr, index);

      // check if greater
      if (year < parseInt(thisYear)) {
        console.log(thisYear, year);
        return index;
      }
    }
  }

  function searchSecondPart(name2) {
    if (parseInt(name2)) return name2;
    return extractYear(name2);
  }

  function extractYear(name) {
    let num = "";
    let lastletter = "1";
    for (let index = 0; index < name.length; index++) {
      const element = name[index];
      if (parseInt(element) || element == "0") {
        if (!parseInt(lastletter) && lastletter != "0") {
          // console.log("deleting: ", num, element, lastletter);
          num = "";
        }
        num += element;
      }
      if (lastletter + element == "BC") num = "-" + num;
      lastletter = element;
    }
    return num;
  }

  const addToBattleLocation = () => {
    const data = { latLon: latLon.split(","), year: year, addedBy: user._id };

    battleLocs[battle] = data;
    updateCountryBattleLocs(country, battleLocs);
  };

  const addToHistory = () => {
    const data = {
      country,
      battle,
      latLon: latLon.split(","),
      year,
      dateAdded: getCurrentDate(),
      source: src,
      addedBy: user._id,
      approved: user.perms.addNewBattle,
    };

    postToHistory(data);
  };

  const addToUserContributions = () => {
    const data = { country, battle, dateAdded: getCurrentDate() };
    user.contributions[battle] = data;

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
        // disabled={!battle || !country || !year || !src || !latLon}
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
};

export default NewBattleForm;
