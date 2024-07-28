import React from "react";
import FavButton from "../../components/FavButton";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";

const Favorites = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Contributions" />
  ) : (
    <div className="flex flex-col belowHeader ">
      <h1>Your Favorites</h1>
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>Battle</th>
            <th>Date Saved</th>
            <th></th>
          </tr>
          {Object.keys(user.favorites).map((battle) => {
            const fav = user.favorites[battle];
            return (
              <tr key={battle}>
                <td>{fav.country}</td>
                <td>
                  <a
                    href={
                      "https://en.wikipedia.org/wiki/" +
                      fav.battle.split(" or ").at(0).replace(" ", "_")
                    }
                    target="_blank"
                    className="underline"
                  >
                    {fav.battle}
                  </a>
                </td>
                <td>{fav.dateAdded}</td>
                <td>
                  <FavButton
                    battle={fav.battle}
                    country={fav.country}
                    user={user}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
