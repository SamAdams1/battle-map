import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccountDropdown = ({ user, setUser }) => {
  const [dropdownVis, setDropdownVis] = useState(false);

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
          <h2 className="text-gray-100">{user.username}</h2>
          <h3 className="text-gray-100 mb-2">Emperor</h3>{" "}
          {/* User Permission Level */}
          <ul>
            <li>
              <button className="w-full">
                <Link to="favorites">Favorites</Link>
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <button className="w-full">
                <Link to="contributions">Contributions</Link>
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => console.log(user)} className="w-full">
                <Link to="settings">Settings</Link>
              </button>
            </li>
          </ul>
          <button onClick={() => setUser({})} className="w-full">
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
