import React, { useState } from "react";
import Table from "./Table";
import { getNumWLoc } from "./forms/dbFuncs";
import Display from "./Display";

const SingleCountry = ({ user, country, data, showPopup, setPopupVis }) => {
  return (
    <div key={"title" + country} className="my-2 flex flex-col overflow-hidden">
      <div className="flex flex-row items-center *:mx-2 mb-6">
        <h1 id={country}>{country}</h1>
        <h2>
          {getNumWLoc(data)} / {data.length} battles
        </h2>
        {user.loggedIn && user.perms.addLoc && (
          <button onClick={() => showPopup(country, "new")}>New Battle</button>
        )}
      </div>
      {data.length > 0 ? (
        // <Table
        //   user={user}
        //   data={data}
        //   country={country}
        //   showPopup={showPopup}
        //   setPopupVis={setPopupVis}
        // />
        <Display
          user={user}
          data={data}
          country={country}
          showPopup={showPopup}
        />
      ) : (
        <h1>No Data</h1>
      )}
    </div>
  );
};

export default SingleCountry;
