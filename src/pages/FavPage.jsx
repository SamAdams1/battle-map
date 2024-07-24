import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "../../components/FavButton";

const FavPage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user]);

  return !user.loggedIn ? (
    <h1>Must be logged in to see favorites...</h1>
  ) : (
    <div>
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
              <tr>
                <td>{fav.country}</td>
                <td>{fav.battle}</td>
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

export default FavPage;
