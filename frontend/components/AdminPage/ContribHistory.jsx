import Axios from "axios";
import React, { useEffect, useState } from "react";
import UserDisplay from "../UserLogin/UserDisplay";
import { ENDPOINT } from "../../environment";
import Card from "../Card";
import {
  searchNamesForYear,
  updateCountryBattleLocs,
} from "../BattlePage/forms/dbFuncs";

const ContribHistory = ({ user, battleLocs }) => {
  const [history, setHistory] = useState([]);
  const [approvedVis, setApprovedVis] = useState(true);
  const [unapprovedVis, setUnapprovedVis] = useState(true);

  const getHistory = () => {
    Axios.get(`${ENDPOINT}/admin/contrib-history`)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setHistory(response.data[0]);
          // console.log(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  const approve = (doc) => {
    doc["approvedBy"] = user._id;

    let idk = history.map((item) => {
      if (item._id == doc._id) item.approved = true;
      return item;
    });

    // setHistory(idk);
    addBattleLoc(doc);
    // updateHistory(doc);
  };

  function getCountryBattles(country) {
    return Axios.get(`${ENDPOINT}/countryBattles`, { params: { country } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
          return null;
        } else {
          return response.data[0];
        }
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  const addBattleLoc = (doc) => {
    const country = doc.country;
    const data = {
      name: doc.battle,
      latLon: doc.latLon,
      year: doc.year,
      addedBy: doc.addedBy,
      approvedBy: doc.approvedBy,
    };
    getCountryBattles(country).then((response) => {
      const battles = response.battles;
      let index = searchNamesForYear(battles, data.year);
      battles.splice(index, 0, data);
      console.log(battles);
    });

    // updateCountryBattleLocs(country, battles);
  };

  const updateHistory = (doc) => {
    Axios.put(`${ENDPOINT}/admin/approveContrib`, {
      id: doc._id,
      approved: doc.approved,
    })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          console.log(response);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getHistory();
  }, []);

  function checkApproved(status) {
    if (status) return approvedVis;
    return unapprovedVis;
  }

  return (
    Object.keys(user).length > 4 && (
      <div>
        {/* <h1>Contribution History</h1>
      <button onClick={() => console.log(history)}>test</button> */}
        <div className="flex *:m-2 w-full bg-gray-400">
          <div className="*:mr-1">
            <input
              type="checkbox"
              name="approved"
              onChange={() => setApprovedVis(!approvedVis)}
              checked={approvedVis}
            />
            <label htmlFor="approved">View Approved</label>
          </div>
          <div className="*:mr-1">
            <input
              type="checkbox"
              name="unapproved"
              onChange={() => setUnapprovedVis(!unapprovedVis)}
              checked={unapprovedVis}
            />
            <label htmlFor="unapproved">View Unapproved</label>
          </div>
        </div>
        <div className="flex flex-wrap">
          {history.map((doc) => {
            const showCard = checkApproved(doc.approved);
            return (
              showCard && (
                <Card
                  key={doc._id}
                  bgColor={doc.approved ? "bg-green-600" : "bg-red-700"}
                  children={
                    <div className="flex flex-col flex-1" key={doc._id}>
                      <div className="*:my-1 p-2 mb-auto">
                        <span>
                          <UserDisplay id={doc.addedBy} />
                        </span>
                        <h3>Battle: {doc.battle}</h3>
                        <h4>Country: {doc.country}</h4>
                        <h4>Year: {doc.year}</h4>
                        <h4>
                          Loc: [{doc.latLon[0]}, {doc.latLon[1]}]
                        </h4>
                        <h4>Added: {doc.dateAdded}</h4>
                        <h4>Source: {doc.source}</h4>
                      </div>
                      {!doc.approved && (
                        <button onClick={() => approve(doc)} className="">
                          Approve
                        </button>
                      )}
                    </div>
                  }
                />
              )
            );
          })}
        </div>
      </div>
    )
  );
};

export default ContribHistory;
