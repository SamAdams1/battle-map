import "./App.css";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

//Custom components
import BattlePage from "./pages/BattlePage";
import MapPage from "./pages/MapPage";

import LoginRegister from "../components/UserLogin/LoginRegister";
import AccountDropdown from "../components/UserLogin/AccountDropdown";

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
    },
  },
  {
    title: "Marshal",
    desc: "Second in command. Can submit battles, approve battles, and premote/demote users.",
    permissions: {
      changeUserLvl: true,
      seeAdminPanel: true,
      reportData: false,
      editData: true,
      addLoc: true,
      addNewBattle: true,
    },
  },
  {
    title: "Corporal",
    desc: "Can submit and approve battles.",
    permissions: {
      changeUserLvl: false,
      seeAdminPanel: true,
      reportData: true,
      editData: false,
      addLoc: true,
      addNewBattle: false,
    },
  },
  {
    title: "Soldier",
    desc: "Can suggest battles and talk in chat.",
    permissions: {
      changeUserLvl: false,
      demoteUsers: false,
      seeAdminPanel: false,
      reportData: true,
      editData: false,
      addLoc: false,
      addNewBattle: false,
    },
  },
];

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    user["loggedIn"] = Object.keys(user).length > 1;
    if (user.loggedIn) {
      user["title"] = userTitles[user.lvl].title;
      user["perms"] = userTitles[user.lvl].permissions;
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route index path="/" element={<MapPage user={user} />} />
        <Route path="battleList" element={<BattlePage user={user} />} />
        <Route path="chat" element={<ChatPage user={user} />}></Route>
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
        {Object.keys(user).length > 1 && (
          <AccountDropdown user={user} setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default App;
