import React from "react";
import { useState, useEffect } from "react";
import Countries from "./CountryList";
import Battles from "./BattleList";

import Axios from "axios";

const InfoPanel = ({ data, panFunc, showMarkerPopup }) => {
  const [showDisplay, setShowDisplay] = useState(true);

  // arrows buttons
  const [country, setCountry] = useState("");
  const [lastCountry, setLastCountry] = useState("");
  const [center, setCenter] = useState({});

  const [header, setHeader] = useState("Select a Country");

  const getCountryCenter = (country) => {
    Axios.get("http://localhost:3005/countryCenter", { params: { country } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          const countryCenter = response.data[0]["countryCenter"];
          setLastCountry("");
          setCenter(countryCenter);
          focusCountry(countryCenter, country);
        }
      })
      .catch((e) => console.log(e));
  };

  const focusCountry = (countryData, countryName) => {
    // console.log(countryData);
    panFunc(countryData.latLon, countryData.zoom);
    setCountry(countryName);
    setHeader("Select a Country");
  };

  const onReset = () => {
    setCountry("");
    setLastCountry("");
    panFunc([40, 10], 2);
    setHeader("Select a Country");
  };

  const onRightArrow = () => {
    setCountry(lastCountry);
    setLastCountry("");
    panFunc(center.latLon, center.zoom);
  };

  const onLeftArrow = () => {
    setLastCountry(country);
    setCountry("");
    setHeader("Select a Country");
  };

  const goToLatLon = (inputLatLon) => {
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
              disabled={
                (!lastCountry && country) ||
                (!country && !lastCountry) ||
                (country != "" && lastCountry == "")
              }
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
                data={data}
                country={country}
                panToBattle={panFunc}
                showMarkerPopup={showMarkerPopup}
                setHeader={setHeader}
              />
            ) : (
              <Countries
                data={data}
                getCountryCenter={getCountryCenter}
                goToLatLon={goToLatLon}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InfoPanel;
