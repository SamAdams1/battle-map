import React, { useEffect, useState } from "react";
import { searchNamesForYear, updateCountryBattleLocs } from "./dbFuncs";

const EditPopup = ({
  user,
  battle,
  year,
  country,
  index,
  battleLocs,
  setPopupVis,
}) => {
  // battle format: ["battle name", " year", "campaign/war", ...]
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [newName, setNewName] = useState(battle);
  const [newYear, setNewYear] = useState(year);

  const hasLatLon = "latLon" in battleLocs[index];

  // console.log(hasLatLon, battleLocs[index]);
  useEffect(() => {
    try {
      const latLon = String(battleLocs[index].latLon).split(",");
      setLat(String(latLon[0]));
      setLon(String(latLon[1]));
    } catch (error) {}
  }, []);

  const saveChanges = () => {
    editBattleLocation();

    setPopupVis(false);
  };

  const editBattleLocation = () => {
    if (hasLatLon) {
      battleLocs[index].latLon = [parseFloat(lat), parseFloat(lon)];
    }
    battle = newName;
    battleLocs[index].year = parseInt(newYear);
    battleLocs[index].name = battle;
    battleLocs[index].pop;

    const data = battleLocs[index];
    battleLocs.splice(index, 1);
    let insertSpot = searchNamesForYear(battleLocs, newYear);
    battleLocs.splice(insertSpot, 0, data);

    updateCountryBattleLocs(country, battleLocs);
  };

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div className="flex flex-col items-center *:m-2">
      <h1>Edit</h1>
      <h2>{country}</h2>
      <h3>{battle}</h3>
      <div className="flex flex-col items-center *:mb-1">
        <h2>Battle Name:</h2>
        <p>Format is: Battle – Year – Campaign/War</p>
        <p>Use " – " as separator.</p>
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
        <p>Negative if before BC.</p>
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
