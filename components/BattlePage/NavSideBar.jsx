import { useState } from "react";

const NavSideBar = ({ countryList }) => {
  const [sideBarVis, setSideBarVis] = useState(true);
  let lastLetter = "";

  return (
    <div className="idk">
      <button
        className="showHideNav"
        onClick={() => setSideBarVis(!sideBarVis)}
      >
        {sideBarVis ? <>Hide</> : <>Show</>} Side Bar
      </button>
      {sideBarVis && (
        <div className="navCountry">
          <a href="#Top" className="topBtn">
            (Top)
          </a>
          {countryList.map((country) => {
            if (country != "_id") {
              return (
                <div key={country + "nav"}>
                  {lastLetter != country.at(0) && (
                    <h2>{(lastLetter = country.at(0))}</h2>
                  )}
                  <p>
                    <a href={"#" + country} className="navBtn">
                      {country}
                    </a>
                  </p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default NavSideBar;
