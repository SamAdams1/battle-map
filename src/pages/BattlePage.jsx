import React, { useEffect, useState } from "react";
import NavSideBar from "../../components/BattlePage/NavSideBar";
import DBPopup from "../../components/BattlePage/DBPopup";
import SingleCountry from "../../components/BattlePage/SingleCountry";
import { useNavigate } from "react-router-dom";

const BattlePage = ({
  battleNameData,
  locationData,
  addLocationData,
  user,
  dataRetrieved,
}) => {
  const [popupVis, setPopupVis] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState("");
  const [battleCountry, setBattleCountry] = useState("");

  function showPopup(battleName, country) {
    setSelectedBattle(battleName);
    setBattleCountry(country);
    setPopupVis(true);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!dataRetrieved) {
      navigate("/");
    }
  }, [user]);

  return locationData == undefined ? (
    <h1>Loading...</h1>
  ) : (
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
        <DBPopup
          battle={selectedBattle}
          country={battleCountry}
          addBattleLoc={addLocationData}
          setPopupVis={setPopupVis}
        />
      )}
    </div>
  );
};

export default BattlePage;
