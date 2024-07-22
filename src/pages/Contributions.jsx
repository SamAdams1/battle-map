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
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>Battle</th>
            <th>Date Added</th>
          </tr>
          {Object.keys(user.contributions).map((item) => (
            <tr>
              <td>{user.contributions[item]["country"]}</td>
              <td>{user.contributions[item]["battle"]}</td>
              <td>{user.contributions[item]["dateAdded"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contributions;
