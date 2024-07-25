import "./App.css";

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
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Contributions from "./pages/Contributions";
import About from "./pages/About";
import ChatPage from "./pages/ChatPage";
import Header from "../components/Header";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Titles from "./pages/Titles";

// user permission functions
import { addBattle } from "../components/UserLogin/userFuncs";

const userTitles = [
  {
    title: "Emperor",
    desc: "Owner of the website.",
    funcs: {
      addLocData: addBattle,
    },
    permissions: {
      canPremoteUsers: true,
      canDemoteUsers: true,
      seeAdminPanel: true,
      canReportData: true,
      canEditData: true,
    },
  },
  {
    title: "Marshal",
    desc: "Second in command. Can submit battles, approve battles, and premote/demote users.",
  },
  {
    title: "Corporal",
    desc: "Can submit and approve battles.",
  },
  {
    title: "Soldier",
    desc: "Can suggest battles and talk in chat.",
  },
];

function App() {
  // handle map data
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [countryCenter, setCountryCenter] = useState({});
  const [battleLocs, setBattleLocs] = useState({});
  const [battleNames, setBattleNames] = useState({});

  // user
  const [user, setUser] = useState({});

  useEffect(() => {
    getDBData("countryCenter", setCountryCenter);
    getDBData("names", setBattleNames);
    getBattleLocations("locations");

    setDataRetrieved(true);
  }, []);

  useEffect(() => {
    user["loggedIn"] = Object.keys(user).length > 1;
    if (user.loggedIn) {
      user["title"] = userTitles[user.lvl].title;
      user["funcs"] = userTitles[user.lvl].funcs;
      user["perms"] = userTitles[user.lvl].permissions;
      console.log(user);
    }
  }, [user]);

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
  const getBattleLocations = (route) => {
    Axios.get(`http://localhost:3005/${route}`)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          combineDbDocuments(response.data[0], setBattleLocs);
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

    Axios.put(`http://localhost:3005/${"addBattleLoc"}`, {
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
    let hour = today.getUTCHours();
    let min = String(today.getUTCMinutes()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ~ ${hour}:${min}`;
  };

  return !dataRetrieved ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Header user={user} />
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
              battleNameData={battleNames}
              locationData={battleLocs}
              addLocationData={addBattleLoc}
              user={user}
            />
          }
        />
        <Route
          path="chat"
          element={<ChatPage user={user} getDate={getCurrentDate} />}
        ></Route>
        <Route path="about" element={<About />} />

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
        <Route path="admin" element={<Admin user={user} />} />
        <Route
          path="titles"
          element={<Titles user={user} titles={userTitles} />}
        />
        <Route path="favorites" element={<Favorites user={user} />} />
        <Route path="contributions" element={<Contributions user={user} />} />
        <Route path="settings" element={<Settings user={user} />} />
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
