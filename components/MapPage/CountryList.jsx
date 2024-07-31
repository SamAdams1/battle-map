import React, { useState } from "react";

const Countries = ({ data, getCountryCenter, goToLatLon }) => {
  const [inputLatLon, setInputLatLon] = useState("");
  let lastLetter = "";

  // console.log(data);
  return (
    <>
      <div className="*:mt-2 overflow-auto max-h-[45em]">
        {Object.keys(data).map((countryName) => {
          let currentLetter = countryName.charAt(0);
          return (
            <div key={countryName}>
              {lastLetter !== currentLetter && (
                <h2 className="border-b-2 border-gray-400 border-solid mb-2 pl-1 pb-1">
                  {(lastLetter = currentLetter)}
                </h2>
              )}
              <button
                onClick={() => getCountryCenter(countryName)}
                className="ml-2"
              >
                {countryName}
              </button>
            </div>
          );
        })}
      </div>

      <div className=" flex">
        <input
          type="text"
          placeholder="Enter LatLon: Ex: 1,1"
          onChange={(e) => setInputLatLon(e.target.value)}
          className="w-min flex-1 rounded-none"
        />
        <button
          onClick={() => goToLatLon(inputLatLon)}
          className="rounded-none"
        >
          Go To
        </button>
      </div>
    </>
  );
};

export default Countries;
