import React, { useEffect, useState } from "react";
import NavSideBar from "../../components/BattlePage/NavSideBar";
import DBPopup from "../../components/BattlePage/forms/DBPopup";
import SingleCountry from "../../components/BattlePage/SingleCountry";
import Report from "../../components/BattlePage/forms/ReportPopup";
import EditPopup from "../../components/BattlePage/forms/EditPopup";
import Popup from "../../components/Popup";
import NewBattleForm from "../../components/BattlePage/forms/NewBattleForm";

const BattlePage = ({ battleNameData, locationData, user }) => {
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
        user={user}
        battle={selectedBattle}
        country={battleCountry}
        battleLocs={locationData}
        setPopupVis={setPopupVis}
      />
    ),
    report: (
      <Report
        user={user}
        battle={selectedBattle}
        country={battleCountry}
        battleLocs={locationData}
        setPopupVis={setPopupVis}
      />
    ),
    edit: (
      <EditPopup
        user={user}
        battle={selectedBattle}
        country={battleCountry}
        battleLocs={locationData}
        setPopupVis={setPopupVis}
      />
    ),
    new: (
      <NewBattleForm
        user={user}
        country={battleCountry}
        battleLocs={locationData}
        battleNames={battleNameData}
        setPopupVis={setPopupVis}
      />
    ),
  };
  return (
    <div className="flex flex-col  items-center belowHeader overflow-auto bg-slate-300">
      <a
        href="https://en.wikipedia.org/wiki/List_of_battles_by_geographic_location"
        target="_blank"
      >
        <h1 id="Top">All Battles</h1>
      </a>
      <NavSideBar countryList={Object.keys(battleNameData)} />

      {Object.keys(battleNameData).map((country) => {
        return (
          <div key={country}>
            {country != "_id" && (
              <SingleCountry
                country={country}
                battleNames={battleNameData}
                battleLocs={locationData}
                showPopup={showPopup}
                user={user}
                setPopupVis={setPopupVis}
              />
            )}
          </div>
        );
      })}
      {popupVis && (
        <Popup children={popupTypes[popupType]} setVis={setPopupVis} />
      )}
    </div>
  );
};

export default BattlePage;
