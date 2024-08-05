import React, { useEffect, useRef, useState } from "react";

const getSavedZoom = () => {
  let savedZoomLevel = localStorage.getItem("zoomLvl");

  if (savedZoomLevel) return savedZoomLevel;
  else return;
};

const Battles = ({
  data,
  country,
  panToBattle,
  showMarkerPopup,
  setHeader,
}) => {
  const minZoom = 5;
  const maxZoom = 15;
  const [zoomLvl, setZoomLvl] = useState(getSavedZoom() || maxZoom);

  const scrollDemoRef = useRef(0);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const scrollTop = scrollDemoRef.current.scrollTop;
      localStorage.setItem("battleScroll", scrollTop);
      localStorage.setItem("country", country);
    }
  };

  const setScrollOnMount = () => {
    if (localStorage.getItem("country") === country) {
      scrollDemoRef.current.scrollTop = localStorage.getItem("battleScroll");
    }
  };

  const saveZoom = (num) => {
    setZoomLvl(parseInt(num));
    localStorage.setItem("zoomLvl", num);
  };

  const onClick = (battleData, battleName) => {
    panToBattle(battleData.latLon, zoomLvl);
    showMarkerPopup(battleName);
  };

  const countBattlesWLocs = () => {
    let count = 0;
    data[country].map((battle) => {
      if ("latLon" in battle) count += 1;
    });
    return count;
  };

  useEffect(() => {
    setScrollOnMount();
    setHeader(
      <>
        {country} - {countBattlesWLocs()}/{data[country].length}
      </>
    );
  }, []);

  return (
    <>
      <div
        className="*:mt-1 overflow-auto max-h-[40em] mb-1"
        ref={scrollDemoRef}
        onScroll={handleScroll}
      >
        {data[country].map((battleData, index) => {
          const battleName = battleData["name"].split(" – ")[0];
          const latLon = battleData["latLon"];
          return (
            <div key={country + index} className="flex">
              <p
                className={
                  "mx-1 pr-1 border-r-4 " +
                  (latLon ? "border-green-400" : "border-red-400")
                }
              >
                {index + 1 + ":"}
              </p>
              {latLon ? (
                <>
                  <button
                    onClick={() => onClick(battleData, battleName)}
                    className="max-w-45 w-full"
                  >
                    {battleName}
                  </button>
                </>
              ) : (
                <>
                  <p>{battleName}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-red-800 text-white flex *:m-1">
        <p>
          Zoom: {zoomLvl < 10 && <>0</>}
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
