import React from "react";

const Countries = ({ data, panToCountry, showBattles, setHeader }) => {
  let lastLetter = "";

  const focusCountry = (countryData, countryName) => {
    panToCountry(countryData.latLon, countryData.zoom);
    showBattles(countryName);
    setHeader("Select a Country");
  };

  return (
    <>
      <div className="*:mt-2 overflow-auto max-h-[45em]">
        {Object.keys(data).map((countryName, index) => {
          if (countryName != "_id") {
            const countryData = data[countryName];
            let currentLetter = countryName.charAt(0);
            return (
              <div key={countryName}>
                {lastLetter !== currentLetter && (
                  <h2 className="border-b-2 border-gray-400 border-solid mb-2 pl-1 pb-1">
                    {(lastLetter = currentLetter)}
                  </h2>
                )}
                <button
                  onClick={() => focusCountry(countryData, countryName)}
                  className="ml-2"
                >
                  {countryName}
                </button>
                <br />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Countries;
