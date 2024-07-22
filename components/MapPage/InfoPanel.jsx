import React from "react";
import { useState, useEffect } from "react";
import Countries from "./CountryList";
import Battles from "./BattleList";

const InfoPanel = ({
  countriesData,
  battlesNames,
  battleLocs,
  panFunc,
  showMarkerPopup,
}) => {
  const [showDisplay, setShowDisplay] = useState(true);
  const [country, setCountry] = useState("");
  const [lastCountry, setLastCountry] = useState("");
  const [inputLatLon, setInputLatLon] = useState("");

  const [header, setHeader] = useState("Select a Country");

  const showBattles = (countryName) => {
    setCountry(countryName);
  };

  const onReset = () => {
    setCountry("");
    setLastCountry("");
    panFunc([40, 10], 2);
    setHeader("Select a Country");
  };

  const onRightArrow = () => {
    if (country == "" && lastCountry != "") {
      setCountry(lastCountry);
      setLastCountry("");
      let countryCenter = countriesData[lastCountry];
      panFunc(countryCenter.latLon, countryCenter.zoom);
    }
  };
  const onLeftArrow = () => {
    setLastCountry(country);
    setCountry("");
    setHeader("Select a Country");
  };

  const goToLatLon = () => {
    if (inputLatLon) {
      let latLonArr = inputLatLon
        .replace(" ", "")
        .replace("[", "")
        .replace("]", "")
        .split(",");
      latLonArr = latLonArr.map((num) => parseFloat(num));
      console.log(latLonArr);
      if (latLonArr[1]) {
        panFunc(latLonArr, 10);
      } else {
        console.log("invalid entry");
      }
    }
  };

  return (
    <div className="fixed bg-slate-100 z-10 right-0">
      <button
        className="absolute right-0 top-0  p-1 min-w-7"
        onClick={() => setShowDisplay(!showDisplay)}
      >
        {showDisplay ? "X" : "Open Display"}
      </button>
      {showDisplay && (
        <>
          <div className="bg-red-800">
            <button
              onClick={() => onLeftArrow()}
              disabled={!country}
              className="w-7"
            >
              {"<"}
            </button>
            <button
              onClick={() => onRightArrow()}
              disabled={(!lastCountry && country) || (!country && !lastCountry)}
              className="w-7"
            >
              {">"}
            </button>
            <button onClick={onReset}>reset</button>
          </div>
          <div className="w-60 border-l-2 border-solid border-red-800">
            <h2 className="p-1 bg-red-800 text-white">{header}</h2>
            {country ? (
              <Battles
                data={battlesNames}
                panToBattle={panFunc}
                country={country}
                battleLocations={battleLocs}
                showMarkerPopup={showMarkerPopup}
                setHeader={setHeader}
              />
            ) : (
              <Countries
                data={countriesData}
                panToCountry={panFunc}
                showBattles={showBattles}
                setHeader={setHeader}
              />
            )}
          </div>
          <div className="bg-red-800">
            <input
              type="text"
              placeholder="Enter LatLon: Ex: 1,1"
              onChange={(e) => setInputLatLon(e.target.value)}
              className="w-min"
            />
            <button onClick={goToLatLon} className="">
              Go To
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoPanel;
