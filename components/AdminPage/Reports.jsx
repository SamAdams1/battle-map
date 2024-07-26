import React, { useEffect, useState } from "react";
import Axios from "axios";
import UserDisplay from "../UserLogin/UserDisplay";

const Reports = ({ user, battleLocs }) => {
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

  const approveReport = (id, index) => {
    setReports(
      reports.filter((i) => {
        return i._id != id;
      })
    );
    Axios.delete("http://localhost:3005/admin/delReport", { params: { id } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          console.log(response.data);
        }
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div>
      <button onClick={() => console.log(reports)}>print</button>
      <h1>Reports</h1>
      <table className="w-ful">
        <tbody>
          <tr>
            <th>User</th>
            <th>Country</th>
            <th>Battle</th>
            <th></th>
          </tr>
          {reports.map((report, index) => (
            <tr key={report.author}>
              <td className={report.author == user._id ? "bg-yellow-200" : ""}>
                <UserDisplay id={report.author} />
              </td>
              <td>{report.country}</td>
              <td>{report.battle}</td>
              <td>{report.reason}</td>
              <td>
                <button onClick={() => approveReport(report._id, index)}>
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
