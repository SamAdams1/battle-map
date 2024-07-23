import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div
      id="Top"
      className="top-0 flex content-evenly  bg-red-800 header text-white *:mr-6 "
    >
      <div className=" flex items-center *:mr-5">
        <ul>
          <li className="battlemap">
            <Link to="/about">
              <h1>Battle Map</h1>
            </Link>
          </li>
        </ul>
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
      </div>
      {!(Object.keys(user).length > 1) && (
        <div className="absolute flex right-0 translate-x-6 items-center">
          <ul>
            <li>
              <button className="text-black">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <button className="text-black">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
