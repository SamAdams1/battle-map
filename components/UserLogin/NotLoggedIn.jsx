import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = ({ pageTitle }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate("/"), 300);
  }, []);

  return (
    <div className="z-50 fixed bg-white w-full h-full -translate-y-14">
      <h1>Must be logged in to view {pageTitle}...</h1>
    </div>
  );
};

export default NotLoggedIn;
