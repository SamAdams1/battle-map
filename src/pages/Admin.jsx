import React, { useState } from "react";

import Users from "../../components/AdminPage/Users";
import Reports from "../../components/AdminPage/Reports";
import ContribHistory from "../../components/AdminPage/ContribHistory";

const Admin = () => {
  const [tab, setTab] = useState("Users");

  const highlightTab = (page) => {
    return page == tab ? "bg-red-400 " : "bg-red-800 ";
  };

  const tabs = {
    Users: <Users />,
    Reports: <Reports />,
    "Approve Contributions": <ContribHistory />,
  };

  return (
    <div className="mt-3">
      {/* <h1>Admin</h1> */}
      <div className="w-full">
        {Object.keys(tabs).map((page) => {
          const highlight = highlightTab(page);
          return (
            <button
              key={page}
              onClick={() => setTab(page)}
              className={highlight + " text-white"}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="bg-red-400 h-">{tabs[tab]}</div>
    </div>
  );
};

export default Admin;
