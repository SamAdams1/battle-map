import React, { useState } from "react";
import Axios from "axios";

const FavButton = ({ battleDict, country, user }) => {
  const [favStatus, setFavStatus] = useState(
    battleDict.id in user.favorites ? "isFav" : "notFav"
  );

  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  };

  // Favorite battle and add to contributions
  const favoriteBattle = (battleName, countryName, setFav) => {
    setFav("isFav");
    const newInfo = {
      id: battleDict.id,
      battle: battleName,
      country: countryName,
      dateAdded: getCurrentDate(),
    };
    user["favorites"][battleDict.id] = newInfo;
    changeFavorites();
  };

  const unfavoriteBattle = (battleName, countryName, setFav) => {
    setFav("notFav");
    delete user.favorites[battleDict.id];
    changeFavorites();
  };

  const changeFavorites = () => {
    // console.log(user.favorites);
    Axios.put("http://localhost:3005/updateFavorites", user)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const favFunctions = {
    isFav: unfavoriteBattle,
    notFav: favoriteBattle,
  };

  return (
    <>
      <button
        className={"favBtn  " + (favStatus == "isFav" ? "bg-yellow-200" : "")}
        onClick={() =>
          favFunctions[favStatus](battleDict.name, country, setFavStatus)
        }
        title="Favorite Battle"
      >
        {favStatus == "isFav" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default FavButton;
