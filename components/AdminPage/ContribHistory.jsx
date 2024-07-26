import Axios from "axios";
import React, { useEffect, useState } from "react";
import UserDisplay from "../UserLogin/UserDisplay";

const ContribHistory = ({ user, battleLocs }) => {
  const [history, setHistory] = useState([]);

  const getHistory = () => {
    Axios.get("http://localhost:3005/admin/contrib-history")
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

    Axios.put("http://localhost:3005/addBattleLoc", {
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
    Axios.put("http://localhost:3005/admin/approveContrib", {
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
      <button onClick={() => console.log(history)}>test</button>
      <table className="w-full">
        <tbody>
          <tr>
            <th>Approved Status</th>
            <th>User</th>
            <th>Date Added</th>
            <th>Country</th>
            <th>Battle</th>
            <th>Year</th>
            <th>LatLon</th>
            <th>Source</th>
          </tr>
          {history &&
            history.map((doc) => {
              const a = doc.approved ? "bg-green-400" : "bg-red-700";
              return (
                <tr key={doc._id}>
                  <td className={a}>
                    {!doc.approved && (
                      <button onClick={() => approve(doc)}>Approve</button>
                    )}
                  </td>
                  <td>
                    <UserDisplay id={doc.addedBy} />
                  </td>
                  <td>{doc.dateAdded}</td>
                  <td>{doc.country}</td>
                  <td>{doc.battle}</td>
                  <td>{doc.year}</td>
                  <td>
                    {doc.latLon[0]}, {doc.latLon[1]}
                  </td>
                  <td className="overflow-auto text-wrap w-10 text-xs max-w-[15em]">
                    {doc.source}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ContribHistory;
