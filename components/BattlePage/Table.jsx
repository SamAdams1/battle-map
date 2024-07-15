import React from "react";
import FavButton from "../FavButton";

const Table = ({ battleNames, battleLocs, country, showPopup, user }) => {
  function tensPlace(coord) {
    coord = coord.toString();
    if (coord.length > 5) {
      coord = coord.slice(0, 5);
    }
    return parseFloat(coord);
  }

  function battleHasLoc(country, battleName) {
    let data = battleLocs[country][battleName];
    if (data) {
      return [tensPlace(data.latLon[0]), tensPlace(data.latLon[1])];
    }
    return data;
  }

  const copyToClipboard = (txt) => {
    alert("Location copied to clipboard: " + txt);
    navigator.clipboard.writeText(txt);
  };

  const userLoggedIn = () => {
    return Object.keys(user).length >= 1;
  };

  // useEffect(() => {
  //   // localStorage.setItem('todosCreated', todosCreated.toString());
  //   console.log("forntie")
  // }, [user]);

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Battle</th>
          <th>Year</th>
          <th>Location</th>
          <th></th>
        </tr>

        {battleNames[country].map((battle, index) => {
          battle = battle.split(" – ").at(0);
          const battleCoords = battleHasLoc(country, battle);
          const year = battleCoords ? battleLocs[country][battle]["year"] : "";

          return (
            <tr key={battle + index}>
              <td>{index + 1}</td>
              <td className={battleCoords ? "green" : "red"}>
                {battle.split(" or ")[0]}
              </td>
              <td>{year}</td>
              <td>
                {battleCoords ? (
                  <button
                    className="addLocBtn"
                    title="Copy to Clipboard"
                    onClick={() => copyToClipboard(battleCoords)}
                  >
                    [{battleCoords[0]}, {battleCoords[1]}]
                  </button>
                ) : (
                  <button
                    className="addLocBtn"
                    title="Add Location Data"
                    onClick={() => showPopup(battle, country)}
                  >
                    Add
                  </button>
                )}
              </td>
              <td>
                {userLoggedIn() && (
                  <FavButton battle={battle} country={country} user={user} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
