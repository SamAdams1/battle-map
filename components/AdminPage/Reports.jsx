import React, { useEffect, useState } from "react";
import Axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get("http://localhost:3005/admin/reports")
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setReports(response.data[0]);
          // console.log(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <table className="w-full">
        <tbody>
          <tr>
            <th>User</th>
            <th>Country</th>
            <th>Battle</th>
            <th></th>
          </tr>
          {reports.map((report) => (
            <tr>
              <td>{report.author}</td>
              <td>{report.country}</td>
              <td>{report.battle}</td>
              <td>{report.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
