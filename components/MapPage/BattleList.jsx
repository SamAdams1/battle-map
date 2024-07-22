import React, { useEffect, useState } from "react";

const getSavedZoom = () => {
  let savedZoomLevel = localStorage.getItem("zoomLvl");

  if (savedZoomLevel) return savedZoomLevel;
  else return;
};

const Battles = ({
  data,
  battleLocations,
  panToBattle,
  country,
  showMarkerPopup,
  setHeader,
}) => {
  const minZoom = 5;
  const maxZoom = 15;
  const [zoomLvl, setZoomLvl] = useState(getSavedZoom() || maxZoom);

  const saveZoom = (num) => {
    setZoomLvl(parseInt(num));
    localStorage.setItem("zoomLvl", num);
    // console.log(localStorage.getItem("zoomLvl"))
  };

  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, zoomLvl);
    showMarkerPopup(battleName);
  };

  useEffect(() => {
    setHeader(
      <>
        {country} - {Object.keys(battleLocations[country]).length}/
        {data[country].length}
      </>
    );
  }, []);

  return (
    <>
      <div className="*:mt-1 overflow-auto max-h-[45em] m-1">
        {data[country].map((battleName, index) => {
          battleName = battleName.split(" – ")[0];
          const battleData = battleLocations[country][battleName];
          return (
            <div key={country + index} className="flex">
              <p className="mr-1 ml-1">{index + 1 + ":"}</p>
              {battleData != undefined ? (
                <>
                  <span className="w-1 bg-green-400 mr-1"></span>
                  <button
                    onClick={() => onClick(battleData, battleName)}
                    className="max-w-45 w-full"
                  >
                    {battleName}
                  </button>
                </>
              ) : (
                <>
                  <span className="w-1 bg-red-400 mr-2"></span>
                  <p>{battleName}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-red-800 text-white flex *:m-1">
        <p>
          Zoom: {zoomLvl < 10 && 0}
          {zoomLvl}
        </p>
        <input
          type="range"
          title="Zoom level when battle is clicked"
          min={minZoom}
          max={maxZoom}
          value={zoomLvl}
          onChange={(e) => saveZoom(e.target.value)}
        />
      </div>
    </>
  );
};

export default Battles;
