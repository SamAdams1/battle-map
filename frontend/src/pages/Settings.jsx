import React, { useState } from "react";
import NotLoggedIn from "../../components/UserLogin/NotLoggedIn";

const Settings = ({ user }) => {
  const [img, setImg] = useState(user.pfp);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState(user.password);
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const submitPfp = () => {
    user.pfp = img;
    console.log(user);
  };

  const saveEdit = () => {
    setEdit(false);
    console.log(newUsername, newPassword);
    user.username = newUsername;
    user.password = newPassword;
    fetch("http://localhost:3005/updateUsernamePassword", {
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
    setNewPassword(user.password);
    console.log(newUsername, newPassword);
  };

  return !user.loggedIn ? (
    <NotLoggedIn pageTitle="Settings" />
  ) : (
    <div className="flex flex-col items-center belowHeader">
      <h1>Settings</h1>
      {/* <img src={img} alt="No pfp found." /> 
      {!img && <input type="file" onChange={handleChange} accept="image" />}*/}
      {img && !user.pfp && (
        <>
          <button onClick={submitPfp}>Submit</button>
          <button onClick={() => setImg("")}>Cancel</button>
        </>
      )}
      {edit ? (
        <>
          <input
            type="text"
            name=""
            id=""
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h2>Username: {user.username}</h2>
          <h2>Password: {user.password}</h2>
          <button onClick={() => setEdit(true)}>Edit</button>
        </>
      )}
      <br />
      <button className="mt-10" disabled>
        Verify Email
      </button>
    </div>
  );
};

export default Settings;
