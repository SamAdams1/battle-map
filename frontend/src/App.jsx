import "./App.css";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

//Custom components
import BattlePage from "./pages/BattlePage";
import MapPage from "./pages/MapPage";

import LoginRegister from "../components/UserLogin/LoginRegister";
import AccountDropdown from "../components/UserLogin/AccountDropdown";

// React router
import { Routes, Route, json } from "react-router-dom";
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
    console.log("changing");

    // check if user logged in
    if (Object.keys(user).length > 4) {
      user["loggedIn"] = true;
      user["lastLoggedIn"] = getCurrentDate().split(" ~ ")[0];
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      user["lvl"] = 4;
    }
    user["title"] = userTitles[user.lvl].title;
    user["perms"] = userTitles[user.lvl].permissions;
  }, [user]);

  function stayedLogged() {
    const a = localStorage.getItem("user");
    if (a) {
      if (a.lastLoggedIn == getCurrentDate().split(" ~ ")[0]) {
        setUser(JSON.parse(a));
      }
    }
  }

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route index path="/" element={<MapPage user={user} />} />
        <Route path="battleList" element={<BattlePage user={user} />} />
        <Route path="chat" element={<ChatPage user={user} />} />
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
        <Route
          path="admin"
          element={<Admin user={user} titles={userTitles} />}
        />
        <Route
          path="titles"
          element={<Titles user={user} titles={userTitles} />}
        />
        <Route path="favorites" element={<Favorites user={user} />} />
        <Route path="contributions" element={<Contributions user={user} />} />
        <Route path="settings" element={<Settings user={user} />} />
      </Routes>
      <div className="accountBtns">
        {Object.keys(user).length > 4 && (
          <AccountDropdown user={user} setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default App;
