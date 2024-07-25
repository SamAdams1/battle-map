import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = ({ user, setUser }) => {
  const [dropdownVis, setDropdownVis] = useState(false);
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
    setDropdownVis(false);
  };

  return (
    <div className="absolute top-0 right-0 w-">
      <button
        className="accountPfp"
        onClick={() => setDropdownVis(!dropdownVis)}
      >
        {user.username.charAt(0)}
      </button>
      {dropdownVis && (
        <div
          className="absolute z-40 -translate-x-[4.5rem] bg-red-800 
        border-solid border-x-2 border-b-2 border-white p-2 rounded-b-lg
        text-center "
        >
          <h2 className="text-gray-100 mb-2">{user.username}</h2>
          <h3 className="text-gray-100 mb-2 underline">
            <Link to="titles">{user.title}</Link>
          </h3>
          <div className="*:w-full">
            <button onClick={() => navigate("admin")}>Admin</button>
            <button onClick={() => navigate("favorites")}>Favorites</button>
            <button onClick={() => navigate("contributions")}>
              Contributions
            </button>
            <button onClick={() => navigate("settings")}>Settings</button>
            <button onClick={() => setUser({})} className="w-full">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
