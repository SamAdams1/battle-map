import React, { useState } from "react";
import Axios from "axios";

const FavButton = ({ battle, country, user }) => {
  const [favStatus, setFavStatus] = useState(
    !(battle in user.favorites) ? "notFav" : "isFav"
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
      battle: battleName,
      country: countryName,
      dateAdded: getCurrentDate(),
    };
    user["favorites"][battleName] = newInfo;
    changeFavorites();
  };
  const unfavoriteBattle = (battleName, countryName, setFav) => {
    setFav("notFav");
    delete user.favorites[battleName];
    changeFavorites();
  };
  const changeFavorites = () => {
    console.log(user.favorites);
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
        className={
          "favBtn w-full " + (favStatus == "isFav" ? "bg-yellow-200" : "")
        }
        onClick={() => favFunctions[favStatus](battle, country, setFavStatus)}
      >
        {favStatus == "isFav" ? <>Unfavorite</> : <>Favorite</>}
      </button>
    </>
  );
};

export default FavButton;
