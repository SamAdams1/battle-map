import React from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";

const Contributions = ({ user }) => {
  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Contributions" />
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
