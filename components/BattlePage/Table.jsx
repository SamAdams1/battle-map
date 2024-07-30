import React from "react";
import FavButton from "../FavButton";
import EditName from "./EditName";

const Table = ({ battleNames, battleLocs, country, showPopup, user }) => {
  function tensPlace(coord) {
    coord = coord.toString();
    if (coord.length > 5) {
      coord = coord.slice(0, 5);
    }
    return parseFloat(coord);
  }

  function battleHasLoc(country, battleName) {
    try {
      let data = battleLocs[country][battleName];
      if (data) {
        return [tensPlace(data.latLon[0]), tensPlace(data.latLon[1])];
      }
      return data;
    } catch {
      return undefined;
    }
  }

  const copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt);
    alert("Location copied to clipboard: " + txt);
  };

  function extractYear(name) {
    let num = "";
    let lastletter = "1";
    for (let index = 0; index < name.length; index++) {
      const element = name[index];
      if (parseInt(element) || element == "0") {
        if (!parseInt(lastletter) && lastletter != "0") {
          // console.log("deleting: ", num, element, lastletter);
          num = "";
        }
        num += element;
      }
      if (lastletter + element == "BC") num = "-" + num;
      lastletter = element;
    }
    return num;
  }

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
          let a = battle.split(" – ");
          battle = a[0];
          const battleCoords = battleHasLoc(country, battle);
          let year = battleCoords ? battleLocs[country][battle]["year"] : a[1];
          // if (year < 0) year = String((year *= -1)).concat(" BC");
          if (!parseInt(year) && a.length >= 2) {
            year = a[2];
          }
          if (!parseInt(year)) year = extractYear(battle);
          return (
            <tr key={battle + index}>
              <td className="text-center">{index + 1}</td>
              <td className={battleCoords ? "bg-green-500" : "bg-red-500"}>
                {/* <a
                  href={
                    "https://en.wikipedia.org/wiki/" +
                    a[0].split(" or ")[0].replace(" ", "_")
                  }
                  target="_blank"
                  className="learnMoreBtn"
                >
                  clickme
                </a> */}
                {parseInt(year) || year == undefined ? (
                  battle.split(" or ")[0]
                ) : (
                  <>
                    <EditName
                      index={index}
                      battleName={battle}
                      nameList={battleNames[country]}
                      country={country}
                    />
                    <>bruh</>
                  </>
                )}
              </td>
              <td className="text-center">
                {year}
                {!parseInt(year) && <>nodata</>}
              </td>
              <td>
                {battleCoords ? (
                  <div className="flex">
                    <button
                      className="flex-1"
                      title="Copy to Clipboard"
                      onClick={() => copyToClipboard(battleCoords)}
                    >
                      [{battleCoords[0]}, {battleCoords[1]}]
                    </button>
                    {user.loggedIn && (
                      <>
                        {user.perms.reportData && (
                          <button
                            onClick={() => showPopup(country, battle, "report")}
                          >
                            Report
                          </button>
                        )}
                        {user.perms.editData && (
                          <button
                            onClick={() => showPopup(country, battle, "edit")}
                          >
                            Edit
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    className="w-full"
                    title="Add Location Data"
                    onClick={() => showPopup(country, battle, "add")}
                    disabled={!user.loggedIn}
                  >
                    {user.loggedIn && user.perms.addLoc ? (
                      <>Add</>
                    ) : (
                      <>Suggest</>
                    )}
                  </button>
                )}
              </td>
              {user.loggedIn && (
                <td>
                  <FavButton battle={battle} country={country} user={user} />
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
