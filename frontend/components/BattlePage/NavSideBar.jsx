import { useEffect, useRef, useState } from "react";

const NavSideBar = ({ countryList, setCountry, selectedCountry }) => {
  const [sideBarVis, setSideBarVis] = useState(true);
  let lastLetter = "";

  const scrollRef = useRef(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      localStorage.setItem("navScroll", scrollTop);
    }
  };

  useEffect(() => {
    if (sideBarVis) {
      scrollRef.current.scrollTop = localStorage.getItem("navScroll");
    }
  }, [sideBarVis]);

  return (
    <div className="absolute left-0 top-24 z-50">
      <button
        className="fixed -translate-y-7 z-10"
        onClick={() => setSideBarVis(!sideBarVis)}
      >
        {sideBarVis ? <>Hide</> : <>Show</>} Nav
      </button>
      {sideBarVis && (
        <div
          className="fixed bg-slate-100 max-h-[60vh] overflow-auto px-2"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="mb-2">
            {countryList.map((country) => {
              return (
                <div key={country + "nav"}>
                  {lastLetter != country.charAt(0) && (
                    <h2 className="border-b-2 border-red-800 border-solid mt-2 pl-1 pb-1 ">
                      {(lastLetter = country.charAt(0))}
                    </h2>
                  )}
                  <button
                    onClick={() => setCountry(country)}
                    className={selectedCountry == country ? "bg-red-500" : ""}
                  >
                    {country}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSideBar;
