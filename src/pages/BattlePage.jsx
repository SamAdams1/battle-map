import React, { useEffect, useState } from "react";
import NavSideBar from "../../components/BattlePage/NavSideBar";
import SingleCountry from "../../components/BattlePage/SingleCountry";
import Popup from "../../components/Popup";

// Forms to interact with Data
import DBPopup from "../../components/BattlePage/forms/DBPopup";
import Report from "../../components/BattlePage/forms/ReportPopup";
import EditPopup from "../../components/BattlePage/forms/EditPopup";
import NewBattleForm from "../../components/BattlePage/forms/NewBattleForm";

import Axios from "axios";

const BattlePage = ({ user }) => {
  const [popupVis, setPopupVis] = useState(false);

  const [data, setData] = useState([]);

  const [country, setCountry] = useState(
    localStorage.getItem("country") || "Germany"
  );
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getData();
    getCountries();
  }, []);

  useEffect(() => {
    getData();
  }, [country]);

  const getData = () => {
    Axios.get("http://localhost:3005/countryBattles", { params: { country } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setData(response.data[0]["battles"]);
        }
      })
      .catch((e) => console.log(e));
  };

  const getCountries = () => {
    Axios.get("http://localhost:3005/countries")
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          let bruh = [];
          response.data[0].map((country) => bruh.push(country.country));
          setCountries(bruh);
        }
      })
      .catch((e) => console.log(e));
  };

  const changeCountry = (country) => {
    localStorage.setItem("country", country);
    setCountry(country);
  };

  let popup = {
    type: "",
    battle: "",
    country: "",
    index: "add",
  };
  function showPopup(bcountry, battle, type, bIndex) {
    popup.country = bcountry;
    popup.battle = battle;
    popup.index = bIndex;
    popup.type = type;
    setPopupVis(true);
  }

  const popupTypes = {
    add: (
      <DBPopup
        user={user}
        displayData={popup}
        battleLocs={data}
        setPopupVis={setPopupVis}
      />
    ),
    report: (
      <Report
        user={user}
        displayData={popup}
        battleLocs={data}
        setPopupVis={setPopupVis}
      />
    ),
    edit: (
      <EditPopup
        user={user}
        displayData={popup}
        battleLocs={data}
        setPopupVis={setPopupVis}
      />
    ),
    new: (
      <NewBattleForm
        user={user}
        displayData={popup}
        battleLocs={data}
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
      <button onClick={() => console.log(countries)}>print</button>
      <NavSideBar countryList={countries} setCountry={changeCountry} />

      <div>
        {country != "_id" && (
          <SingleCountry
            user={user}
            country={country}
            data={data}
            showPopup={showPopup}
            setPopupVis={setPopupVis}
          />
        )}
      </div>
      {popupVis && (
        <Popup children={popupTypes[popup.type]} setVis={setPopupVis} />
      )}
    </div>
  );
};

export default BattlePage;
