import React from "react";
import FavButton from "../FavButton";
import Axios from "axios";

const Table = ({ user, data, country, showPopup }) => {
  function tensPlace(coord) {
    coord = coord.toString();
    if (coord.length > 5) {
      coord = coord.slice(0, 5);
    }
    return parseFloat(coord);
  }

  function battleHasLoc(latLon) {
    return [tensPlace(latLon[0]), tensPlace(latLon[1])];
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
    return parseInt("" + num);
  }

  function setYear(battleData, battleArr) {
    let name = battleData.name;
    if (name.split(" – ").length >= 3) {
      name = name.split(" – ").slice(0, -1).join(" – ");
    }
    let year = extractYear(name);
    if (Number.isNaN(year) && "year" in battleData) {
      year = battleData["year"];
    }
    // console.log(Number.isNaN(year), battleData, year);

    // let year = "year" in battleData ? battleData["year"] : "a";

    // if (!parseInt(year) && battleArr.length >= 1) console.log(battleArr[1]);
    // if (!parseInt(year) && battleArr.length >= 3) {
    //   year = extractYear(battleArr[2]);
    // }
    // if (!parseInt(year)) year = extractYear(battleArr[0]);
    // if (year < 0) year = String((year *= -1)).concat(" BC");
    return year;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Battle</th>
          {user.loggedIn && <th></th>}
          <th>Year</th>
          <th>Location</th>
          <th></th>
          <th></th>
        </tr>

        {data.map((battleData, index) => {
          let battle = battleData["name"];

          let battleArr = battle.split(" – ");
          let name = battleArr[0];

          const battleCoords =
            "latLon" in battleData ? battleHasLoc(battleData["latLon"]) : "";
          // let year = setYear(battleData, battleArr);
          let year = battleData["year"];

          if (parseInt(year)) data[index]["year"] = parseInt(year);
          else data[index]["year"] = year;

          return (
            <tr key={name + index}>
              <td className="text-center">{index + 1}</td>
              <td className={battleCoords ? "bg-green-500" : "bg-red-500"}>
                <a
                  href={
                    "https://en.wikipedia.org/wiki/" +
                    name.split(" or ")[0].replace(" ", "_")
                  }
                  target="_blank"
                  className="underline"
                >
                  {/* {battleArr.length >= 3
                    ? battleArr.slice(0, -1).join(" – ")
                    : name} */}
                  {name}
                </a>
              </td>
              {user.loggedIn && (
                <td>
                  <FavButton
                    battleDict={battleData}
                    country={country}
                    user={user}
                  />
                </td>
              )}
              <td className="text-center">
                {/* <button onClick={() => console.log(data[index]["year"])}> */}
                {year}
                {!parseInt(year) && <>nodata</>}
                {!parseInt(year) && console.log(index, battle)}
                {/* </button> */}
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
                  </div>
                ) : (
                  <button
                    className="w-full"
                    title="Add Location Data"
                    onClick={() => showPopup(battle, "add", index, year)}
                    disabled={!user.loggedIn}
                  >
                    {user.perms.addLoc ? <>Add</> : <>Suggest</>}
                  </button>
                )}
              </td>
              {user.perms.editData && (
                <td>
                  <button
                    onClick={() =>
                      showPopup(battleArr, "edit", index, data[index]["year"])
                    }
                  >
                    Edit
                  </button>
                </td>
              )}
              {user.perms.reportData && (
                <td>
                  <button onClick={() => showPopup(battle, "report", index)}>
                    Report
                  </button>
                </td>
              )}
              {user.perms.deleteBattle && (
                <td>
                  <button onClick={() => showPopup(battleArr, "delete", index)}>
                    Delete
                  </button>
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
