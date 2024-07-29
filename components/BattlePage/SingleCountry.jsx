import React, { useState } from "react";
import Table from "./Table";

const SingleCountry = ({
  country,
  battleNames,
  battleLocs,
  showPopup,
  user,
  setPopupVis,
}) => {
  const [collapseable, setCollapseable] = useState(true);

  function getTotalBattles(countryName) {
    try {
      let total = Object.keys(battleLocs[countryName]).length;
      if (total) {
        return total;
      }
      return 0;
    } catch {
      return 0;
    }
  }
  const totalBattles = battleNames[country].length;

  return (
    <div key={"title" + country} className="my-5 flex flex-col ">
      <div className="flex">
        <h1 id={country}>{country}</h1>
        <h2>
          {getTotalBattles(country)} / {totalBattles} battles
        </h2>
        {totalBattles > 0 && (
          <button onClick={() => setCollapseable(!collapseable)}>
            {collapseable ? <>hide</> : <>show</>}
          </button>
        )}
        {user.loggedIn && user.perms.addLoc && (
          <button onClick={() => showPopup(country, "", "new")}>
            New Battle
          </button>
        )}
      </div>
      {totalBattles > 0 && collapseable && (
        <Table
          battleNames={battleNames}
          battleLocs={battleLocs}
          country={country}
          showPopup={showPopup}
          user={user}
          setPopupVis={setPopupVis}
        />
      )}
    </div>
  );
};

export default SingleCountry;
