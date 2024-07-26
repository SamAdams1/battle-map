import Axios from "axios";
import React, { useEffect, useState } from "react";

const Users = ({ titles, user }) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    Axios.get("http://localhost:3005/admin/users")
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
    Axios.put("http://localhost:3005/admin/changeUserLvl", {
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
    <div>
      <h1>Users</h1>
      <button onClick={() => console.log(users)}>test</button>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Lvl</th>
            <th># of Contributes</th>
          </tr>
          {users.map((thisUser) => (
            <tr key={thisUser._id}>
              <td className={thisUser._id === user._id ? "bg-yellow-400" : ""}>
                {thisUser.username}
              </td>
              <td className="px-5">
                {titles[thisUser.lvl].title} {thisUser.lvl}
              </td>
              <td>{Object.keys(thisUser.contributions).length}</td>
              {user.perms.changeUserLvl && (
                <td>
                  <>
                    <button
                      onClick={() => updateUserLvl(1, thisUser)}
                      disabled={thisUser.lvl <= user.lvl || thisUser.lvl == 1}
                    >
                      Premote
                    </button>
                    <button
                      onClick={() => updateUserLvl(-1, thisUser)}
                      disabled={thisUser.lvl <= user.lvl || thisUser.lvl == 3}
                    >
                      Demote
                    </button>
                  </>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
