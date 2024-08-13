import React, { useEffect, useState } from "react";
import Axios from "axios";
import UserDisplay from "../UserLogin/UserDisplay";
import { ENDPOINT } from "../../environment";
import Card from "../Card";

const Reports = ({ user, battleLocs }) => {
  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get(`${ENDPOINT}/admin/reports`)
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
    Axios.delete(`${ENDPOINT}/admin/delReport`, { params: { id } })
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
      {reports.map((report, index) => (
        <Card
          children={
            <>
              <h5>{report.author}</h5>
              <h3>{report.country}</h3>
              <h3>{report.battle}</h3>
              <h3>{report.reason}</h3>
              <button
                onClick={() => approveReport(report._id, index)}
                className="text-black"
              >
                Mark Complete
              </button>
            </>
          }
        />
      ))}
    </div>
  );
};

export default Reports;
