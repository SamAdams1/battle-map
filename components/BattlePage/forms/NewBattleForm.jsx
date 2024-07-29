import React, { useEffect, useState } from "react";
import Axios from "axios";
import { postToHistory, updateCountryBattleLocs } from "./dbFuncs";

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
    searchNameForYear();
    // console.log(battle, country, year);
    // addBattleName();
    // addBattleLocation();
    // addToHistory();
    // addToUserContributions();

    // setPopupVis(false);
  };

  const addBattleName = () => {
    battleNames[country].push(battle);
    // check battlelocs for 2 battles one with larger year and another with smaller year
    let largerYear;
    let smallerYear;
    Object.keys(battleLocs[country]).map((battle) => {
      let idk = battleLocs[country][battle];
      if (idk.year > year && !largerYear) {
        largerYear = idk;
      }
      // if (idk.year < year) {smallerYear = idk;}
    });
    // console.log("smaller", smallerYear, "larger", largerYear);
    searchNameForYear();
  };

  function extractYear(name) {
    let num = "";
    let lastletter = "1";
    for (let index = 0; index < name.length; index++) {
      const element = name[index];
      if (parseInt(element) || element == "0") {
        if (!parseInt(lastletter) && lastletter != "0") {
          console.log("deleting: ", num, element, lastletter);
          num = "";
        }
        num += element;
      }
      lastletter = element;
    }
    return num;
  }
  function searchSecondPart(name2) {
    if (parseInt(name2)) return name2;
    return extractYear(name2);
  }

  function searchNameForYear() {
    // loop through namelist, search for matching battlename and grab index insert before or before year
    battleNames[country].map((b) => {
      let thisYear;
      b = b.split(" – ");
      if (b.length >= 2) thisYear = searchSecondPart(b[1]);
      else console.log(b);
      console.log(thisYear, b[0]);
    });
  }

  const addBattleLocation = () => {
    const data = { latLon: latLon, year: year, addedBy: user._id };

    battleLocs[country][battle] = data;
    updateCountryBattleLocs(country, battleLocs[country]);
  };

  const addToHistory = () => {
    const data = { latLon: latLon, year: year, addedBy: user._id, source: src };

    postToHistory(data);
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
