import React from "react";
import { motion } from "framer-motion";
import FavButton from "../FavButton";

const BattleSingle = ({ user, data, country, showPopup }) => {
  const char = " – ";
  const hasLatLon = "latLon" in data;

  function tensPlace(coord) {
    coord = coord.toString();
    if (coord.length > 5) {
      coord = coord.slice(0, 5);
    }
    return parseFloat(coord);
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => console.log(data)}
      className={
        `max-w-64 m-2 w-64
        border-2 border-gray-950 ` +
        (hasLatLon ? " bg-green-500" : " bg-red-500")
      }
    >
      {user.loggedIn && (
        <div className="right-0">
          <FavButton battleDict={data} country={country} user={user} />
        </div>
      )}

      <div className={"p-2 pb-5 "}>
        <h2>{data.name.split(char)[0].split(" or ")[0]}</h2>
        <h2>{data.year}</h2>
        {hasLatLon ? (
          <h2>
            {hasLatLon &&
              tensPlace(data.latLon[0]) + ", " + tensPlace(data.latLon[1])}
          </h2>
        ) : (
          <button
            className=""
            title="Add Location Data"
            onClick={() => showPopup(battle, "add", index, year)}
            disabled={!user.loggedIn}
          >
            {user.perms.addLoc ? <>Add</> : <>Suggest</>} Data
          </button>
        )}
      </div>

      <div className="flex ">
        {user.perms.editData && (
          <button
            onClick={() =>
              showPopup(battleArr, "edit", index, data[index]["year"])
            }
            className="w-full"
          >
            Edit
          </button>
        )}

        {user.perms.reportData && (
          <button
            onClick={() => showPopup(battle, "report", index)}
            className="w-full"
          >
            Report
          </button>
        )}

        {user.perms.deleteBattle && (
          <button
            onClick={() => showPopup(battleArr, "delete", index)}
            className="w-full"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BattleSingle;
