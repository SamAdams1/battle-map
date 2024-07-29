import React, { useEffect, useState } from "react";
import Axios from "axios";
import { updateCountryBattleLocs } from "./dbFuncs";

const EditPopup = ({ battle, country, battleLocs, setPopupVis, user }) => {
  const latLon = String(battleLocs[country][battle].latLon).split(",");
  const [lat, setLat] = useState(String(latLon[0]));
  const [lon, setLon] = useState(String(latLon[1]));

  const editBattleLocation = () => {
    let editedLatlon = [parseFloat(lat), parseFloat(lon)];
    battleLocs[country][battle].latLon = editedLatlon;
    battleLocs[country][battle]["editedBy"] = user._id;

    updateCountryBattleLocs(country, battleLocs[country]);
    setPopupVis(false);
  };

  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div>
      <h1>Edit</h1>
      <h2>{country}</h2>
      <h2>{battle}</h2>
      <div className="flex">
        <div>
          <h3>Lat:</h3>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div>
          <h3>Lon:</h3>
          <input
            type="text"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => editBattleLocation()}>Save</button>
    </div>
  );
};

export default EditPopup;
