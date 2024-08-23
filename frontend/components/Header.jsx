import React from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "./UserLogin/AccountDropdown";
import { motion } from "framer-motion";

const Header = ({ user, setUser }) => {
  return (
    <div className="fixed w-full top-0 flex bg-red-800 text-white z-50 h-14">
      <div className=" flex items-center w-full mr-auto *:mx-2 ">
        <Link to="/about">
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="ml-0 mr-3 large-component"
          >
            Battle Map
          </motion.h2>
          <h2 className="ml-0 mr-3 small-component">BM</h2>
        </Link>
        <Link to="/">
          <motion.p whileHover={{ scale: 1.2 }}>Map</motion.p>
        </Link>
        <Link to="/wiki">
          <motion.p whileHover={{ scale: 1.2 }}>Wiki</motion.p>
        </Link>
        <Link to="chat">
          <motion.p whileHover={{ scale: 1.2 }}>Chat</motion.p>
        </Link>
        {/* <button onClick={() => console.log(user)}>user</button> */}
      </div>

      {Object.keys(user).length > 4 ? (
        <AccountDropdown user={user} setUser={setUser} />
      ) : (
        <div className="absolute right-0 translate-y-2 *:p-2 *:rounded2xl">
          <motion.button whileHover={{ scale: 1.1 }}>
            <Link to="/login">Login</Link>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="ml-2 mr-1">
            <Link to="/register">Register</Link>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Header;
