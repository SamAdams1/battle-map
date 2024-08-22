import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ENDPOINT } from "../../environment";

const UserDisplay = ({ id }) => {
  const [user, setUser] = useState({});
  const [showUser, setShowUser] = useState(false);

  function getThisUser() {
    console.log(id);
    Axios.get(`${ENDPOINT}/userDisplay`, { params: { id } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log("UserDisplay error.");
          setUser({ username: "User not found" });
        } else {
          setUser(response.data[0]);
          // console.log(response.data[0]);
        }
        setShowUser(true);
      })
      .catch((e) => console.error(e));
  }

  return showUser ? (
    <>{user.username}</>
  ) : (
    <button onClick={getThisUser}>Fetch Username</button>
  );
};

export default UserDisplay;
