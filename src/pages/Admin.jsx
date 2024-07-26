import React, { useState } from "react";

import Users from "../../components/AdminPage/Users";
import Reports from "../../components/AdminPage/Reports";
import ContribHistory from "../../components/AdminPage/ContribHistory";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";

const Admin = ({ user, titles, battleLocs }) => {
  const [tab, setTab] = useState("Users");

  const highlightTab = (page) => {
    return page == tab ? "bg-red-400 " : "bg-red-800 ";
  };

  const tabs = {
    Users: <Users titles={titles} />,
    Reports: <Reports user={user} battleLocs={battleLocs} />,
    "Approve Contributions": (
      <ContribHistory user={user} battleLocs={battleLocs} />
    ),
  };

  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Admin Page" />
  ) : (
    <div className="mt-3">
      <p>admin</p>
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
