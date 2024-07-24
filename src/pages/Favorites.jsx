import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "../../components/FavButton";

const Favorites = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user]);

  return !user.loggedIn ? (
    <h1>Must be logged in to see favorites...</h1>
  ) : (
    <div className="flex flex-col">
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
