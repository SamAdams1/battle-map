import Axios from "axios";
import React from "react";

const DBPopup = ({ battle, country, battleLocs, setPopupVis, user }) => {
  let latLon = "";
  let year = 0;

  function addToDB() {
    latLon = latLon
      .replace("[", "")
      .replace("]", "")
      .replace(" ", "")
      .split(",");
    if (
      latLon.length > 1 &&
      !isNaN(Number.parseFloat(latLon[0])) &&
      !isNaN(Number.parseFloat(latLon[1]))
    ) {
      latLon = latLon.map((num) => parseFloat(num));
      const data = { latLon: latLon, year: year };
      addBattleLoc(country, battle, data);
      setPopupVis(false);
    }
  }

  const addBattleLoc = (country, battle, data) => {
    data["addedByUser"] = "Sam";
    battleLocs[country][battle] = data;
    const total = Object.keys(battleLocs[country]).length;
    console.log(battleLocs[country]);
    addToUserData(battle, country, "contributions");

    Axios.put("http://localhost:3005/addBattleLoc", {
      battles: battleLocs[country],
      country,
      total,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  // favorited and contributed battles added to user card
  const addToUserData = (battleName, countryName, route) => {
    if (user.loggedIn) {
      const newInfo = {
        battle: battleName,
        country: countryName,
        dateAdded: getCurrentDate(),
      };
      user[route][battleName] = newInfo;

      Axios.put("http://localhost:3005/updateContributions", {
        _id: user._id,
        contributions: user.contributions,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    }
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

  return (
    <div>
      {/* <button onClick={() => setPopupVis(false)}>X</button> */}
      <h1>{country}</h1>
      <h1>{battle}</h1>
      <h2>Latitude, Longitude:</h2>
      <h3>No brackets or spaces.</h3>
      <input
        type="text"
        placeholder="Example: 34.37,62.17"
        onChange={(e) => (latLon = e.target.value)}
      />
      <h2>Year:</h2>
      <h3>Negative Number if BC</h3>
      <input
        type="number"
        placeholder="Year"
        onChange={(e) => (year = parseInt(e.target.value))}
      />
      <br />
      <br />
      <button onClick={() => addToDB()}>Submit</button>

      {/* <select name="popupFunc" id="popupFunc" onChange={(e) => console.log(e.target.value)}>
        <option value="Add">Add</option>
        <option value="Report">Report</option>
        <option value="Delete">Delete</option>
      </select> */}
    </div>
  );
};

export default DBPopup;
