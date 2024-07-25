import React, { useEffect, useState } from "react";
import NavSideBar from "../../components/BattlePage/NavSideBar";
import DBPopup from "../../components/BattlePage/DBPopup";
import SingleCountry from "../../components/BattlePage/SingleCountry";

const BattlePage = ({
  battleNameData,
  locationData,
  addLocationData,
  user,
}) => {
  const [popupVis, setPopupVis] = useState(false);
  const [popupType, setPopupType] = useState("");

  const [selectedBattle, setSelectedBattle] = useState("");
  const [battleCountry, setBattleCountry] = useState("");

  function showPopup(country, battleName, type) {
    setSelectedBattle(battleName);
    setBattleCountry(country);
    setPopupType(type);
    setPopupVis(true);
  }

  const popupTypes = {
    add: (
      <DBPopup
        battle={selectedBattle}
        country={battleCountry}
        addBattleLoc={addLocationData}
        setPopupVis={setPopupVis}
      />
    ),
    report: <h2>report</h2>,
  };
  return (
    <div className="flex flex-col items-center">
      <a
        href="https://en.wikipedia.org/wiki/List_of_battles_by_geographic_location"
        target="_blank"
      >
        <h1>All Battles</h1>
      </a>
      <NavSideBar countryList={Object.keys(battleNameData)} />

      {Object.keys(battleNameData).map((country) => {
        return (
          country != "_id" && (
            <SingleCountry
              country={country}
              battleNames={battleNameData}
              battleLocs={locationData}
              showPopup={showPopup}
              user={user}
              setPopupVis={setPopupVis}
            />
          )
        );
      })}
      {popupVis && (
        <div className="z-30 fixed bg-white w-full h-full -translate-y-14">
          <button onClick={() => setPopupVis(false)}>X</button>
          {popupTypes[popupType]}
        </div>
      )}
    </div>
  );
};

export default BattlePage;
