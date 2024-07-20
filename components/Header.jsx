import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div id="Top" className="header">
      <h1>Battle Map</h1>
      {/* <button onClick={() => console.log(user)}>test</button> */}
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
      <ul>
        <li>
          <Link to="chat">Chat</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      {!(Object.keys(user).length > 1) && (
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
  );
};

export default Header;
