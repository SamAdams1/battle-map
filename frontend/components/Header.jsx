import React from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "./UserLogin/AccountDropdown";

const Header = ({ user, setUser }) => {
  return (
    <div className="fixed w-full top-0 flex bg-red-800 text-white z-50 h-14">
      <div className=" flex items-center w-full mr-auto *:mx-2 ">
        <Link to="/about">
          <h2 className="ml-0 mr-3 large-component">Battle Map</h2>
          <h2 className="ml-0 mr-3 small-component">BM</h2>
        </Link>
        <Link to="/">Map</Link>
        <Link to="/wiki">Wiki</Link>
        <Link to="chat">Chat</Link>
        {/* <button onClick={() => console.log(user)}>user</button> */}
      </div>

      {Object.keys(user).length > 4 ? (
        <AccountDropdown user={user} setUser={setUser} />
      ) : (
        <div className="absolute right-0 translate-y-2 *:p-2 *:rounded2xl">
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button className="ml-2 mr-1">
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
