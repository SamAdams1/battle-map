import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "../../components/FavButton";

const FavPage = ({ user }) => {
  const navigate = useNavigate();

  const userLoggedIn = () => {
    return Object.keys(user).length >= 1;
  };

  useEffect(() => {
    if (!userLoggedIn()) {
      navigate("/");
    }
  }, [user]);

  return !userLoggedIn() ? (
    <h1>Must be logged in to see favorites.</h1>
  ) : (
    <div>
      <h1>Your Favorites</h1>
      <button onClick={() => console.log(user.favorites)}>test</button>
      {Object.keys(user.favorites).map((battle) => {
        const fav = user.favorites[battle];
        return (
          <>
            <h2>
              {fav.country} - {fav.battle} - {fav.dateAdded}
              <FavButton
                battle={fav.battle}
                country={fav.country}
                user={user}
              />
            </h2>
          </>
        );
      })}
    </div>
  );
};

export default FavPage;
