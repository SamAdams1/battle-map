import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const AccountDropdown = ({ user, setUser }) => {
  const [dropdownVis, setDropdownVis] = useState(false);

  return (
    <div className="accountDropdownDiv">
      <button
        className="accountPfp"
        onClick={() => setDropdownVis(!dropdownVis)}
      >
        {user.username.charAt(0)}
      </button>
      {dropdownVis && (
        <div className="dropdown">
          <h2>{user.username}</h2>
          <h3>Emperor</h3> {/* User Permission Level */}
          <ul>
            <li>
              <Link to="favorites">Favorites</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="contributions">Contributions</Link>
            </li>
          </ul>
          <button onClick={() => console.log(user)}>Settings</button>
          <button onClick={() => setUser({})}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
