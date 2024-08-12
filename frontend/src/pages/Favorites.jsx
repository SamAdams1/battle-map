import React from "react";
import FavButton from "../../components/FavButton";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";

{
  /* <th>Country</th>
            <th>Battle</th>
            <th>Date Saved</th> */
}
const Favorites = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Favorites" />
  ) : (
    <div className="flex flex-col belowHeader ">
      <h1>Your Favorites</h1>
      <div className="flex flex-wrap">
        {Object.keys(user.favorites).map((id) => {
          const fav = user.favorites[id];
          const nameOnly = fav.battle.split(" – ")[0].split(" or ")[0];
          // console.log(fav);
          return (
            <div
              className={`flex flex-col flex-1 p-2
            max-w-72 m-2 bg-red-700 text-white
            border-2 border-gray-900 rounded`}
            >
              <FavButton battleDict={fav} country={fav.country} user={user} />
              <h2>{nameOnly}</h2>
              <h3>{fav.country}</h3>
              <h3>{fav.dateAdded}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
