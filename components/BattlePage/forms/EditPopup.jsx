import React, { useEffect, useState } from "react";
import { updateCountryBattleLocs, updateNameList } from "./dbFuncs";

const EditPopup = ({
  battleArr,
  country,
  index,
  battleLocs,
  battleNames,
  setPopupVis,
  user,
}) => {
  // battle format: ["battle name", " year", "campaign/war", ...]
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [newName, setNewName] = useState("");
  const [newYear, setNewYear] = useState("");

  const hasLatLon = battleLocs[battleArr[0]] ? true : false;

  useEffect(() => {
    setNameYear();
    try {
      const latLon = String(battleLocs[battleArr[0]].latLon).split(",");
      setLat(String(latLon[0]));
      setLon(String(latLon[1]));
    } catch (error) {}
  }, []);

  const setNameYear = () => {
    try {
      setNewName(battleArr[0]);
      setNewYear(battleArr[1]);
    } catch (error) {
      console.log("Battle Array too short: ", battleArr);
    }
  };

  const saveChanges = () => {
    editBattleLocation();
    editNameList();

    setPopupVis(false);
  };

  const editBattleLocation = () => {
    let data = battleLocs[battleArr[0]];
    console.log(battleLocs, battleArr[0]);
    data.latLon = [parseFloat(lat), parseFloat(lon)];
    data.year = newYear;

    delete battleLocs[battleArr[0]];

    battleLocs[newName] = data;

    console.log(battleLocs);
    updateCountryBattleLocs(country, battleLocs);
  };

  const editNameList = () => {
    battleArr[0] = newName;
    battleArr[1] = newYear;

    battleNames[index] = battleArr.join(" – ");

    updateNameList(country, battleNames);
  };

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div className="flex flex-col items-center *:m-2">
      <h1>Edit</h1>
      <h2>{country}</h2>
      <h3>{battleArr.join(" – ")}</h3>
      <div className="flex flex-col items-center *:mb-1">
        <h2>Battle Name:</h2>
        <textarea
          name="battle"
          cols="30"
          rows="3"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col items-center ">
        <h1>Year</h1>
        <input
          type="text"
          name="year"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
        />
      </div>
      {hasLatLon && (
        <div className="flex flex-col">
          <div className="flex ">
            <h3 className="mr-2">Lat:</h3>
            <input
              name="lat"
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <div className="flex">
            <h3>Lon:</h3>
            <input
              name="lon"
              type="text"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </div>
        </div>
      )}
      <button
        onClick={saveChanges}
        disabled={!newName || !newYear || (hasLatLon && !(lat && lon))}
      >
        Save
      </button>
    </div>
  );
};

export default EditPopup;
