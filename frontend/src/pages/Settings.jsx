import React, { useState } from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import { ENDPOINT } from "../../environment";
import Axios from "axios";

const Settings = ({ user, setUser }) => {
  const [newUsername, setNewUsername] = useState(user.username);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [edit, setEdit] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const saveEdit = () => {
    setEdit(false);
    console.log(newUsername, newPassword);
    user.username = newUsername;
    user.password = newPassword;
    fetch(`${ENDPOINT}/updateUsernamePassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((response) => {
      console.log(response);
    });
  };
  const cancelEdit = () => {
    setEdit(false);
    setNewUsername(user.username);
    setNewPassword("");
    console.log(newUsername, newPassword);
  };

  async function deleteAccount() {
    console.log("deleteing");

    const response = await Axios.delete(`${ENDPOINT}/deleteUser`, {
      params: { id: user._id },
    });
    console.log(response.data);
    setUser({});
    localStorage.removeItem("user");
  }

  async function login() {
    console.log(newUsername, newPassword);

    const response = await Axios.post(`${ENDPOINT}/userLogin`, {
      username: newUsername,
      password: newPassword,
    });
    if (response.status) {
      console.log("good");
      if (response.data[0]._id === user._id) {
        console.log("same user");
        setEdit(true);
      } else throw new Error("login to current user");
    }
    console.log(response);
  }

  async function changeUsername() {
    console.log("cahngeusername");
    try {
      const response = await Axios.put(`${ENDPOINT}/changeUsername`, {
        newUsername: newUsername,
        id: user._id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Settings" />
  ) : (
    <div className="flex flex-col items-center belowHeader *:max-w-[28em] px-2">
      <h1>Settings</h1>

      <div className="*:m-2">
        <h2>Change your username. Enter a new username.</h2>
        <div className="">
          <p className="mr-1">Username</p>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <button
          className="p-1"
          onClick={changeUsername}
          disabled={!newUsername}
        >
          Change username
        </button>
      </div>

      <div className="*:m-1 self">
        <h2>Change your password. Enter your new password. </h2>

        <div>
          <p className="mr-2">Old password</p>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <p className="mr-2">New password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <p className="mr-2">Confirm new password</p>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button
          className="p-1"
          onClick={login}
          disabled={
            !oldPassword ||
            !newPassword ||
            !confirmNewPassword ||
            newPassword !== confirmNewPassword
          }
        >
          Update password
        </button>
      </div>
      <div className="flex flex-col *:my-1">
        <h1 className="text-red-600 font-semibold">Delete Account</h1>
        <p>
          Delete your account and all of its data. This action is irreversible.
        </p>
        <span>
          <button
            className="text-red-600 p-1"
            onClick={() => setConfirmDelete(!confirmDelete)}
          >
            Delete account
          </button>
        </span>
        {confirmDelete && (
          <div className="*:p-2 *:mx-1">
            <button onClick={deleteAccount}>Confirm</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
