import React from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "./UserLogin/AccountDropdown";

const Header = ({ user, setUser }) => {
  return (
    <div className="top-0 flex bg-red-800 text-white z-50">
      <div className=" flex items-center w-full mr-auto *:mx-2 ">
        <Link to="/about">
          <h1 className="text-nowrap whitespace-nowrap ml-0 mr-3">
            Battle Map
          </h1>
        </Link>
        <Link to="/">Map</Link>
        <Link to="/battleList">Battles</Link>
        {/* <Link to="chat">Chat</Link> */}
        {/* <button onClick={() => console.log(user)}>user</button> */}
      </div>

      {Object.keys(user).length > 4 ? (
        <AccountDropdown user={user} setUser={setUser} />
      ) : (
        <div className="flex *:rounded-2xl">
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button className="ml-2">
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
