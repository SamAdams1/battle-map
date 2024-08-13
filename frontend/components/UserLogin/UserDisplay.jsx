import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ENDPOINT } from "../../environment";

const UserDisplay = ({ id }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(`${ENDPOINT}/userDisplay`, { params: { id } })
      .then((response) => {
        if (response.data.length == 0) {
          console.log("UserDisplay error.");
        } else {
          setUser(response.data[0]);
          // console.log(response.data[0]);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return <>{user.username}</>;
};

export default UserDisplay;
