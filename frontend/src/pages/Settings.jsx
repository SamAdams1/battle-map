import React, { useState } from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";
import { ENDPOINT } from "../../environment";
import Axios from "axios";

const Settings = ({ user, setUser }) => {
  const [newUsername, setNewUsername] = useState(user.username);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);

  async function deleteAccount() {
    console.log("deleteing");

    const response = await Axios.delete(`${ENDPOINT}/deleteUser`, {
      params: { id: user._id },
    });
    console.log(response.data);
    setUser({});
    localStorage.removeItem("JWT");
  }

  async function updatePassword() {
    console.log(oldPassword, newPassword, confirmNewPassword);
    try {
      const response = await Axios.put(`${ENDPOINT}/updatePassword`, {
        oldPassword,
        newPassword,
        id: user._id,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  async function changeUsername() {
    console.log("changeusername");
    try {
      const response = await Axios.put(`${ENDPOINT}/changeUsername`, {
        newUsername: newUsername,
        id: user._id,
      });
      user.username = newUsername;
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
        <h1>Change your username.</h1>
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
        <h1>Change your password.</h1>

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
          onClick={updatePassword}
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
