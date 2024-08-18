import Axios from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINT } from "../../environment";
import Card from "../Card";

const Users = ({ titles, user }) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    Axios.get(`${ENDPOINT}/admin/users`)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          setUsers(response.data[0]);
          // console.log(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  const updateUserLvl = (value, thisUser) => {
    setUsers(
      users.map((u) => {
        if (u._id === thisUser._id) u.lvl -= value;
        return u;
      })
    );
    updateNewLvl(thisUser);
    // console.log(value, users);
  };

  const updateNewLvl = (thisUser) => {
    Axios.put(`${ENDPOINT}/admin/changeUserLvl`, {
      id: thisUser._id,
      lvl: thisUser.lvl,
    })
      .then((response) => {
        if (response.data.length == 0) {
          console.log(route + " not found.");
        } else {
          console.log(response.data);
          // console.log(response.data[0]);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    Object.keys(user).length > 4 && (
      <div>
        {/* <h1>Users</h1>
      <button onClick={() => console.log(users)}>test</button> */}
        <div className="flex flex-wrap ">
          {users.map((thisUser) => (
            <Card
              key={thisUser._id}
              bgColor={
                thisUser._id === user._id ? "bg-yellow-600" : "bg-red-700"
              }
              children={
                <div className="p-2">
                  <h2>{thisUser.username}</h2>
                  <h3>
                    {titles[thisUser.lvl].title} {thisUser.lvl}
                  </h3>
                  <h3>
                    Contributions: {Object.keys(thisUser.contributions).length}
                  </h3>
                  {user.perms.changeUserLvl && user._id != thisUser._id && (
                    <div className="flex flex-row">
                      <button
                        onClick={() => updateUserLvl(1, thisUser)}
                        disabled={thisUser.lvl <= user.lvl || thisUser.lvl == 1}
                        className="text-black"
                      >
                        Premote
                      </button>
                      <button
                        onClick={() => updateUserLvl(-1, thisUser)}
                        disabled={thisUser.lvl <= user.lvl || thisUser.lvl == 3}
                        className="text-black"
                      >
                        Demote
                      </button>
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Users;
