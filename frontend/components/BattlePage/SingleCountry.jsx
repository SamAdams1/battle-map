import React, { useState } from "react";
import Table from "./Table";
import { getNumWLoc } from "./forms/dbFuncs";
import BattleSingle from "./BattleSingle";

const SingleCountry = ({ user, country, data, showPopup, setPopupVis }) => {
  return (
    <div key={"title" + country} className="my-2 flex flex-col overflow-hidden">
      <div className="flex flex-row items-center *:mx-2 mb-7">
        <h1 id={country}>{country}</h1>
        <h2>
          {getNumWLoc(data)} / {data.length} battles
        </h2>
        {user.loggedIn && user.perms.addLoc && (
          <button onClick={() => showPopup(country, "new")}>New Battle</button>
        )}
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap">
          {data.map((battle, index) => (
            <BattleSingle
              key={index}
              user={user}
              data={battle}
              index={index}
              country={country}
              showPopup={showPopup}
            />
          ))}
        </div>
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
};

export default SingleCountry;
