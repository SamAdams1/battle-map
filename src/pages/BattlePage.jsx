import React, { useEffect, useState } from "react";
import NavSideBar from "../../components/BattlePage/NavSideBar";
import SingleCountry from "../../components/BattlePage/SingleCountry";
import Popup from "../../components/Popup";

// Forms to interact with Data
import DBPopup from "../../components/BattlePage/forms/DBPopup";
import Report from "../../components/BattlePage/forms/ReportPopup";
import EditPopup from "../../components/BattlePage/forms/EditPopup";
import NewBattleForm from "../../components/BattlePage/forms/NewBattleForm";

const BattlePage = ({ battleNameData, locationData, user }) => {
  const [popupVis, setPopupVis] = useState(false);
  const [popupType, setPopupType] = useState("");

  const [selectedBattle, setSelectedBattle] = useState([]);
  const [battleCountry, setBattleCountry] = useState("");
  const [index, setIndex] = useState("");

  function showPopup(country, battle, type, bIndex) {
    setBattleCountry(country);
    setSelectedBattle(battle);
    setIndex(bIndex);
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
        battleArr={selectedBattle}
        country={battleCountry}
        index={index}
        battleNames={battleNameData[battleCountry]}
        battleLocs={locationData[battleCountry]}
        setPopupVis={setPopupVis}
        user={user}
      />
    ),
    new: (
      <NewBattleForm
        user={user}
        country={battleCountry}
        battleLocs={locationData[battleCountry]}
        battleNames={battleNameData[battleCountry]}
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
      <button onClick={() => console.log(locationData)}>fdha</button>
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
