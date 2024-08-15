import React from "react";
import FavButton from "../../components/FavButton";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import Card from "../../components/Card";

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
      <h1 className="ml-4">Your Favorites</h1>
      <div className="flex flex-wrap">
        {Object.keys(user.favorites).map((id) => {
          const fav = user.favorites[id];
          const nameOnly = fav.battle.split(" – ")[0].split(" or ")[0];
          const hasLatLon = "latLon" in fav;
          // console.log(fav);
          return (
            <Card
              key={fav.id}
              bgColor={hasLatLon ? "bg-green-600" : "bg-red-700"}
              children={
                <div key={id} className="flex">
                  <div className=" p-2">
                    <h2>{nameOnly} </h2>
                    <h3>{fav.year}</h3>
                    <h3>{fav.country}</h3>
                    <h3>{hasLatLon && fav.latLon[0] + ", " + fav.latLon[1]}</h3>
                  </div>
                  <div>
                    <FavButton
                      battleDict={fav}
                      country={fav.country}
                      user={user}
                    />
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
