import React from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import FavButton from "../../components/FavButton";

const Contributions = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Contributions" />
  ) : (
    <div className="flex flex-col belowHeader">
      <h1>Your Contributions</h1>

      <div className="flex flex-wrap">
        {user.contributions.map((battleDict) => {
          return (
            <div
              key={battleDict.id}
              className={`flex flex-col flex-1 p-2
            w-72 m-2 bg-red-700 text-white
            border-2 border-gray-900 rounded`}
            >
              <h2>
                <a
                  href={
                    "https://en.wikipedia.org/wiki/" +
                    battleDict.battle.split(" or ").at(0).replace(" ", "_")
                  }
                  target="_blank"
                  className="underline"
                >
                  {battleDict.battle}
                </a>
              </h2>
              <h3>{battleDict.country}</h3>
              <h3>{battleDict["dateAdded"]}</h3>
              <span className="text-black">
                <FavButton
                  country={battleDict.country}
                  battleDict={battleDict}
                  user={user}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contributions;
