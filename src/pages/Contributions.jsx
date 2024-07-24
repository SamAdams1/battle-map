import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contributions = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user]);

  return !user.loggedIn ? (
    <h1>Must be logged in to see contributions...</h1>
  ) : (
    <div className="flex flex-col">
      <h1>Your Contributions</h1>
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>Battle</th>
            <th>Date Added</th>
          </tr>
          {Object.keys(user.contributions).map((item) => (
            <tr key={item}>
              <td>{user.contributions[item]["country"]}</td>
              <td>
                <a
                  href={
                    "https://en.wikipedia.org/wiki/" +
                    user.contributions[item]["battle"]
                      .split(" or ")
                      .at(0)
                      .replace(" ", "_")
                  }
                  target="_blank"
                  className="underline"
                >
                  {user.contributions[item]["battle"]}
                </a>
              </td>
              <td>{user.contributions[item]["dateAdded"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contributions;
