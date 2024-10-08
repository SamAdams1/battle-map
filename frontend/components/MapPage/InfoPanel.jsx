import React from "react";
import { useState, useEffect } from "react";
import Countries from "./CountryList";
import Battles from "./BattleList";

import Axios from "axios";
import { ENDPOINT } from "../../environment";

const InfoPanel = ({ data, panFunc, showMarkerPopup }) => {
  const [showDisplay, setShowDisplay] = useState(true);

  // arrows buttons
  const [country, setCountry] = useState("");
  const [lastCountry, setLastCountry] = useState("");
  const [center, setCenter] = useState({});

  const [header, setHeader] = useState("Select a Country");

  const getCountryCenter = (country) => {
    Axios.get(`${ENDPOINT}/countryCenter`, { params: { country } })
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
        title="Toggle Display"
      >
        {showDisplay ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        )}
      </button>
      {showDisplay && (
        <>
          <div className="bg-red-800">
            <button
              onClick={() => onLeftArrow()}
              disabled={!country}
              className="w-10"
              title={country ? "Country List" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button
              onClick={() => onRightArrow()}
              disabled={
                (!lastCountry && country) ||
                (!country && !lastCountry) ||
                (country != "" && lastCountry == "")
              }
              title={lastCountry ? `Last Country: ${lastCountry}` : ""}
              className="w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
            <button onClick={onReset} title="Reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mx-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
          <div className="w-60 border-l-2 border-solid border-red-800">
            <h2 className="p-1 bg-red-800 text-white">{header}</h2>
            <div className=" *:max-h-[60vh] ">
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
          </div>
          {/* <div className="flex flex-row flex-1 items-center">
            <p>Battles Between</p>
            <input
              type="number"
              name=""
              id=""
              maxLength={4}
              max="2024"
              className="w-14 no-spinners"
            />
            <p>-</p>
            <input
              type="number"
              name=""
              id=""
              maxLength={4}
              className="w-12 no-spinners"
            />
          </div> */}
          {/* <button>Confirm</button> */}
        </>
      )}
    </div>
  );
};

export default InfoPanel;
