import React, { useState } from "react";
import Table from "./Table";

const SingleCountry = ({ user, country, data, showPopup, setPopupVis }) => {
  const getNumWLoc = () => {
    let count = 0;
    data.map((battle) => {
      if ("latLon" in battle) count += 1;
    });
    return count;
  };

  return (
    <div key={"title" + country} className="my-5 flex flex-col ">
      <div className="flex">
        <h1 id={country}>{country}</h1>
        <h2>
          {getNumWLoc()} / {data.length} battles
        </h2>
        {user.loggedIn && user.perms.addLoc && (
          <button onClick={() => showPopup(country, "", "new")}>
            New Battle
          </button>
        )}
      </div>
      {data.length > 0 ? (
        <Table
          user={user}
          data={data}
          country={country}
          showPopup={showPopup}
          setPopupVis={setPopupVis}
        />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
};

export default SingleCountry;
