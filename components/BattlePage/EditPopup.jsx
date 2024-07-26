import React, { useState } from "react";
import Axios from "axios";

const EditPopup = ({ battle, country, battleLocs, setPopupVis, user }) => {
  const latLon = String(battleLocs[country][battle].latLon).split(",");
  const [lat, setLat] = useState(String(latLon[0]));
  const [lon, setLon] = useState(String(latLon[1]));

  const editBattleLocation = () => {
    let editedLatlon = [parseFloat(lat), parseFloat(lon)];
    battleLocs[country][battle].latLon = editedLatlon;
    console.log(lat + ", " + lon);
    console.log(Object.keys(battleLocs[country]).length);
    Axios.put("http://localhost:3005/addBattleLoc", {
      battles: battleLocs[country],
      country: country,
      total: Object.keys(battleLocs[country]).length,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
    setPopupVis(false);
  };

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
