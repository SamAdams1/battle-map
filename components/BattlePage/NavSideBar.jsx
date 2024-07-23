import { useState } from "react";

const NavSideBar = ({ countryList }) => {
  const [sideBarVis, setSideBarVis] = useState(true);
  let lastLetter = "";

  return (
    <div className="absolute left-0 top-24">
      <button
        className="fixed -translate-y-8"
        onClick={() => setSideBarVis(!sideBarVis)}
      >
        {sideBarVis ? <>Hide</> : <>Show</>} Side Bar
      </button>
      {sideBarVis && (
        <div className="fixed bg-slate-100 max-h-[40em] overflow-auto px-2">
          <a href="#Top" className="fixed bg-slate-100 w-60 top">
            (Top)
          </a>
          <div className="mt-7 mb-2">
            {countryList.map((country) => {
              if (country != "_id") {
                return (
                  <div key={country + "nav"}>
                    {lastLetter != country.at(0) && (
                      <h2 className="border-b-2 border-red-800 border-solid mt-2 pl-1 pb-1 ">
                        {(lastLetter = country.at(0))}
                      </h2>
                    )}
                    <p>
                      <a href={"#" + country} className="underline">
                        {country}
                      </a>
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSideBar;
