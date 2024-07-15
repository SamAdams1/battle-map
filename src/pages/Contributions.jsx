import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contributions = ({ user }) => {
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
    <h1>Must be logged in to see contributions.</h1>
  ) : (
    <div>
      <h1>Your Contributions</h1>
      <button onClick={() => console.log(user.contributions)}>test</button>
      {Object.keys(user.contributions).map((contr) => {
        console.log(user.contributions[contr]);
        return <h2>{user.contributions[contr].battle}</h2>;
      })}
    </div>
  );
};

export default Contributions;
