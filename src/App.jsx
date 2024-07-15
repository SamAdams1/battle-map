import "./reset.css";
import "./App.css";

// leaflet map imports
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

//Custom components
import BattlePage from "./pages/BattlePage";
import MapPage from "./pages/MapPage";

import LoginRegister from "../components/UserLogin/LoginRegister";
import AccountDropdown from "../components/UserLogin/AccountDropdown";

// Better fetch
import Axios from "axios";

// React router
import { Routes, Route, Link } from "react-router-dom";

function App() {
  // handle map data
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [countryCenter, setCountryCenter] = useState({});
  const [battleLocs, setBattleLocs] = useState({});
  const [battleNames, setBattleNames] = useState({});

  // user
  const [user, setUser] = useState({});

  const getDBData = (route, setState) => {
    Axios.get(`http://localhost:3005/${route}`)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setState(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };
  // for battle locations
  const dbNewFormatData = (route, setState) => {
    Axios.get(`http://localhost:3005/${route}`)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          combineDbDocuments(response.data[0], setState);
        }
      })
      .catch((e) => console.log(e));
  };

  const combineDbDocuments = (data, setState) => {
    if (data) {
      const retrievedData = {};
      data.map((country) => {
        retrievedData[country["country"]] = country["battles"];
      });
      if (retrievedData) {
        setState(retrievedData);
      }
    }
  };

  const addBattleLoc = (country, battle, data) => {
    data["addedByUser"] = "Sam";
    battleLocs[country][battle] = data;
    const total = Object.keys(battleLocs[country]).length;
    console.log(battleLocs[country]);
    addToUserData(battle, country, "contributions");

    // Axios.put(`http://localhost:3005/${"addBattleLoc"}`, {
    //   "battles": battleLocs[country], country, total}
    // ).then((response) => {
    //   console.log(response);
    // }).catch((e) => console.log(e))
  };

  useEffect(() => {
    getDBData("countryCenter", setCountryCenter);
    getDBData("names", setBattleNames);
    dbNewFormatData("locations", setBattleLocs);

    setDataRetrieved(true);
  }, []);

  const addToUserData = (battleName, countryName, route) => {
    if (userLoggedIn()) {
      const newInfo = {
        battle: battleName,
        country: countryName,
        dateAdded: getCurrentDate(),
      };
      user[route][battleName] = newInfo;

      Axios.put(`http://localhost:3005/${route}`, user)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    } else {
      alert("Must be logged in to favorite.");
    }
  };

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  };

  const userLoggedIn = () => {
    return Object.keys(user).length >= 1;
  };

  return !dataRetrieved ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div id="Top" className="header">
        <h1>Battle Map</h1>
        <button onClick={() => console.log(user)}>test</button>
        <ul>
          <li>
            <Link to="/">Map</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/battleList">Battle List</Link>
          </li>
        </ul>
        {!userLoggedIn() && (
          <div className="accountBtns">
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Routes>
        <Route
          index
          path="/"
          element={
            <MapPage
              countryCenter={countryCenter}
              battleNames={battleNames}
              battleLocs={battleLocs}
              user={user}
            />
          }
        />
        <Route
          path="battleList"
          element={
            <BattlePage
              nameData={battleNames}
              locationData={battleLocs}
              addLocationData={addBattleLoc}
              user={user}
            />
          }
        />
        <Route
          path="login"
          element={
            <LoginRegister formType={"Login"} setUser={setUser} user={user} />
          }
        />
        <Route
          path="register"
          element={
            <LoginRegister
              formType={"Register"}
              setUser={setUser}
              user={user}
            />
          }
        />
      </Routes>
      <div className="accountBtns">
        {Object.keys(user).length > 1 && (
          <AccountDropdown user={user} setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default App;
