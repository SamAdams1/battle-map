import Axios from "axios";
import React, { useEffect, useState } from "react";

const Users = ({ titles }) => {
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td className="px-5">{titles[user.lvl].title}</td>
              <td>{Object.keys(user.contributions).length}</td>
              {/* <td><button>report</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
