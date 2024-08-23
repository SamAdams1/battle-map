import React, { useEffect, useRef, useState } from "react";

const Countries = ({ data, getCountryCenter, goToLatLon }) => {
  const [inputLatLon, setInputLatLon] = useState("");
  let lastLetter = "";

  const scrollDemoRef = useRef(0);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const scrollTop = scrollDemoRef.current.scrollTop;
      localStorage.setItem("countryScroll", scrollTop);
    }
  };

  useEffect(() => {
    scrollDemoRef.current.scrollTop = localStorage.getItem("countryScroll");
  }, []);

  // console.log(data);
  return (
    <>
      <div
        className="*:mb-2 overflow-auto"
        ref={scrollDemoRef}
        onScroll={handleScroll}
      >
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
                className="ml-2 p-2"
                title={`View ${countryName} Battles`}
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
