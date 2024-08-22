import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = ({ user, setUser }) => {
  const [dropdownVis, setDropdownVis] = useState(false);
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
    setDropdownVis(false);
  };

  const logOut = () => {
    const bruh = {
      loggedIn: false,
      title: "Recruit",
      lvl: 4,
      perms: {
        changeUserLvl: false,
        demoteUsers: false,
        seeAdminPanel: false,
        reportData: false,
        editData: false,
        addLoc: false,
        addNewBattle: false,
        deleteBattle: false,
      },
    };
    localStorage.removeItem("JWT");
    setUser(bruh);
  };
  function goSettings() {
    setDropdownVis(false);
    navigate("settings");
  }

  return (
    <div className={"absolute right-0"}>
      <button
        className="accountPfp"
        onClick={() => setDropdownVis(!dropdownVis)}
      >
        {user.username.charAt(0)}
      </button>
      {dropdownVis && (
        <div
          className="fixed z-40 -translate-x-[10rem] bg-red-800 
        border-solid border-4 border-t-0 border-black p-2 rounded-b-lg
        text-center w-48"
        >
          <div className="*:text-gray-100 *:mb-2">
            <h2 className="overflow-auto">{user.username}</h2>
            <h3 className="underline">
              <Link to="titles">{user.title}</Link>
            </h3>
          </div>
          <div className="*:w-full">
            {user.perms.seeAdminPanel && (
              <button onClick={() => navigate("admin")}>Admin</button>
            )}
            <button onClick={() => navigate("favorites")}>Favorites</button>
            <button onClick={() => navigate("contributions")}>
              Contributions
            </button>
            <button onClick={goSettings}>Settings</button>
            <button onClick={logOut} className="w-full">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
