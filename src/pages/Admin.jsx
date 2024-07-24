import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <Link to="users">Users</Link>
      <Link to="reports">Reports</Link>
      <Link to="contribution-history">Contribution History</Link>
    </div>
  );
};

export default Admin;
