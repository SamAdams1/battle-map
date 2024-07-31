import React, { useEffect, useState } from "react";
import {
  postToHistory,
  updateCountryBattleLocs,
  updateUserContributions,
} from "./dbFuncs";

const DBPopup = ({ user, battle, country, battleLocs, setPopupVis }) => {
  const [latLon, setLatLon] = useState("");
  const [year, setYear] = useState(0);
  const [src, setSrc] = useState("");

  function addToDB(latlon) {
    latlon = latlon
      .replace("[", "")
      .replace("]", "")
      .replace(" ", "")
      .split(",");
    // console.log(latLon, latlon);
    if (
      latlon.length > 1 &&
      !isNaN(Number.parseFloat(latlon[0])) &&
      !isNaN(Number.parseFloat(latlon[1]))
    ) {
      latlon = latlon.map((num) => parseFloat(num));
      const data = { latLon: latlon, year: year };
      if (user.perms.addLoc) addBattleLoc(country, battle, data);
      suggestBattle(battle, country, latlon, year);
      setPopupVis(false);
    }
  }

  const addBattleLoc = (country, battle, data) => {
    data["addedBy"] = user._id;
    battleLocs[battle] = data;
    const total = Object.keys(battleLocs).length;
    // console.log(battleLocs);
    addToUserContributions(battle, country);

    updateCountryBattleLocs(country, battleLocs);
  };

  // contributed battles added to user card
  const addToUserContributions = (battleName, countryName) => {
    const newInfo = {
      battle: battleName,
      country: countryName,
      dateAdded: getCurrentDate(),
    };
    user["contributions"][battleName] = newInfo;

    updateUserContributions(user._id, user.contributions);
  };

  // adds battle to contribution history collection
  // if user has correct perms will be approved and added to location db
  // if not battle will need to be approved by admin
  const suggestBattle = (battle, country, latLon, year) => {
    const data = {
      latLon,
      year,
      battle,
      country,
      dateAdded: getCurrentDate(),
      addedBy: user._id,
      source: src,
      approved: user.perms.addLoc,
    };

    postToHistory(data);
  };

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let hour = today.getUTCHours();
    let min = String(today.getUTCMinutes()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ~ ${hour}:${min}`;
  };

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div className="*:m-1 flex flex-col items-center">
      {/* <button onClick={() => setPopupVis(false)}>X</button> */}
      <h1>{user.perms.addLoc ? <>Add Location</> : <>Suggest Location</>}</h1>
      {!user.perms.addLoc && (
        <>
          <p>
            Due to the low trust level of your account, an admin will need to
            approve your addition.
          </p>
          <p>Make good contributions, with sources, to be promoted!</p>
        </>
      )}
      <h1>{battle}</h1>
      <h2>{country}</h2>
      <h3>Latitude, Longitude:</h3>
      <h3>(No brackets or spaces)</h3>
      <input
        type="text"
        placeholder="Example: 34.37,62.17"
        value={latLon}
        onChange={(e) => setLatLon(e.target.value)}
      />
      <h2>Year:</h2>
      <h3>Negative Number if BC</h3>
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <h3>Source:</h3>
      <textarea
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        placeholder="Source:"
      />

      <br />
      <button
        onClick={() => addToDB(latLon)}
        disabled={!year || !latLon || !src}
      >
        Submit
      </button>
    </div>
  );
};

export default DBPopup;
