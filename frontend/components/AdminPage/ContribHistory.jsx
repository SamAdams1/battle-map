import Axios from "axios";
import React, { useEffect, useState } from "react";
import UserDisplay from "../UserLogin/UserDisplay";
import { ENDPOINT } from "../../environment";
import Card from "../Card";

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

    setHistory(idk);
    addBattleLoc(doc);
    updateHistory(doc);
  };

  const addBattleLoc = (doc) => {
    const country = doc.country;
    const data = {
      latLon: doc.latLon,
      year: doc.year,
      addedBy: doc.user,
      approvedBy: doc.approvedBy,
    };
    battleLocs[country][doc.battle] = data;
    const total = Object.keys(battleLocs[country]).length;

    Axios.put(`${ENDPOINT}/addBattleLoc`, {
      battles: battleLocs[country],
      country,
      total,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
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

  return (
    <div>
      <h1>Contribution History</h1>
      {/* <button onClick={() => console.log(history)}>test</button> */}
      <div className="flex *:m-2">
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
      <div className="flex flex-row flex-wrap">
        {history.map((doc) => (
          <Card
            children={
              <>
                <p className={doc.approved ? "bg-green-400" : "bg-red-700"}>
                  {!doc.approved && (
                    <button onClick={() => approve(doc)}>Approve</button>
                  )}
                </p>
                <UserDisplay id={doc.addedBy} />
                <h2>{doc.battle}</h2>
                <h3>{doc.country}</h3>
                <h>{doc.dateAdded}</h>
                <h>{doc.year}</h>
                <h>
                  {doc.latLon[0]}, {doc.latLon[1]}
                </h>
                <h className="overflow-auto text-wrap text-xs max-w-">
                  {doc.source}
                </h>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ContribHistory;
