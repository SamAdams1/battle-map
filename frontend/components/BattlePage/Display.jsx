import React from "react";
import BattleSingle from "./BattleSingle";
import { AnimatePresence, motion } from "framer-motion";

const Display = ({ user, data, country, showPopup }) => {
  return (
    <div className="flex flex-wrap">
      {data.map((battle, index) => (
        <BattleSingle
          user={user}
          data={battle}
          index={index}
          country={country}
          showPopup={showPopup}
        />
      ))}
    </div>
  );
};

export default Display;
