import "./App.css";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

import LoginRegister from "../components/UserLogin/LoginRegister";

// React router
import { Routes, Route, BrowserRouter } from "react-router-dom";
// pages
import BattlePage from "./pages/BattlePage";
import MapPage from "./pages/MapPage";
import Favorites from "./pages/Favorites";
import Contributions from "./pages/Contributions";
import About from "./pages/About";
import ChatPage from "./pages/ChatPage";
import Header from "../components/Header";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Titles from "./pages/Titles";

import { ENDPOINT } from "../environment";
import { getCurrentDate } from "../components/BattlePage/forms/dbFuncs";
import axios from "axios";

const userTitles = [
  {
    title: "Emperor",
    desc: "Owner of the website.",
    permissions: {
      changeUserLvl: true,
      seeAdminPanel: true,
      reportData: true,
      editData: true,
      addLoc: true,
      addNewBattle: true,
      deleteBattle: true,
    },
  },
  {
    title: "Marshal",
    desc: "Second in command. Premote/demote users, submit and approve battles, ",
    permissions: {
      changeUserLvl: true,
      seeAdminPanel: true,
      reportData: false,
      editData: true,
      addLoc: true,
      addNewBattle: true,
      deleteBattle: false,
    },
  },
  {
    title: "Corporal",
    desc: "Submit and approve battles.",
    permissions: {
      changeUserLvl: false,
      seeAdminPanel: true,
      reportData: true,
      editData: false,
      addLoc: true,
      addNewBattle: false,
      deleteBattle: false,
    },
  },
  {
    title: "Soldier",
    desc: "Suggest battles and talk in chat.",
    permissions: {
      changeUserLvl: false,
      demoteUsers: false,
      seeAdminPanel: false,
      reportData: true,
      editData: false,
      addLoc: false,
      addNewBattle: false,
      deleteBattle: false,
    },
  },
  {
    title: "Recruit",
    desc: "View battles.",
    permissions: {
      changeUserLvl: false,
      demoteUsers: false,
      seeAdminPanel: false,
      reportData: false,
      editData: false,
      addLoc: false,
      addNewBattle: false,
      deleteBattle: false,
    },
  },
];

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    stayedLogged();
    console.log(ENDPOINT);
  }, []);

  useEffect(() => {
    // check if user logged in
    if (Object.keys(user).length > 4) {
      user["loggedIn"] = true;
    } else {
      user["lvl"] = 4;
    }
    user["lastLoggedIn"] = getCurrentDate().split(" ~ ")[0];
    user["title"] = userTitles[user.lvl].title;
    user["perms"] = userTitles[user.lvl].permissions;
  }, [user]);

  async function stayedLogged() {
    console.log("stay logged in");
    try {
      const token = localStorage.getItem("JWT");
      const response = await axios.put(`${ENDPOINT}/userInfo`, { token });
      if (response.data.length == 0) {
        setErrorMsg("Token expired.");
      } else {
        console.log("JWT SUCCESS");
        setUser(response.data.user[0]);
      }
    } catch (error) {
      // console.error(error);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route index path="/" element={<MapPage user={user} />} />
          <Route path="/battleList" element={<BattlePage user={user} />} />
          <Route path="/chat" element={<ChatPage user={user} />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/login"
            element={
              <LoginRegister formType={"Login"} setUser={setUser} user={user} />
            }
          />
          <Route
            path="/register"
            element={
              <LoginRegister
                formType={"Register"}
                setUser={setUser}
                user={user}
              />
            }
          />
          <Route
            path="/admin"
            element={<Admin user={user} titles={userTitles} />}
          />
          <Route
            path="/titles"
            element={<Titles user={user} titles={userTitles} />}
          />
          <Route path="/favorites" element={<Favorites user={user} />} />
          <Route
            path="/contributions"
            element={<Contributions user={user} />}
          />
          <Route
            path="/settings"
            element={<Settings user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
