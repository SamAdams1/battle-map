import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  return (
    <div className="top-0 flex content-evenly  bg-red-800 header text-white *:mr-6 z-50">
      <div className=" flex items-center *:mr-5">
        <Link to="/about">
          <h1 className="ml-2 text-nowrap">Battle Map</h1>
        </Link>
        <Link to="/">Map</Link>
        <Link to="/battleList">Battle List</Link>
        {/* <Link to="chat">Chat</Link> */}
      </div>
      {!(Object.keys(user).length > 4) && (
        <div className="absolute flex right-[-1.5em] top-3 *:mx-1">
          <button className="text-black">
            <Link to="/login">Login</Link>
          </button>
          <button className="text-black">
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
