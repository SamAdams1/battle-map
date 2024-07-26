import Axios from "axios";
import React, { useEffect, useState } from "react";

const ContribHistory = () => {
  const [history, setHistory] = useState([]);

  const getHistory = () => {
    Axios.get("http://localhost:3005/admin/contrib-history")
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setHistory(response.data[0]);
          console.log(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  const approve = () => {};

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div>
      <h1>Contribution History</h1>
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
            history.map((doc) => (
              <tr key={doc._id}>
                <td
                  className={
                    doc.approved ? "bg-green-400" : "bg-red-700 text-white"
                  }
                >
                  {doc.approved + ""}
                </td>
                <td>{doc.user}</td>
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
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContribHistory;
