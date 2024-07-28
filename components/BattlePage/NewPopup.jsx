import React, { useEffect } from "react";
import Axios from "axios";

const NewPopup = () => {
  useEffect(() => {
    if (!user.loggedIn) setPopupVis(false);
  }, [user]);

  return (
    <div>
      <h1>New Battle</h1>
    </div>
  );
};

export default NewPopup;
