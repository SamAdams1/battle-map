import React, { useState } from "react";

const Settings = ({ user }) => {
  const [img, setImg] = useState(user.pfp);

  const handleChange = (e) => {
    console.log(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h1>Settings</h1>
      <img src={img} alt="No pfp found." />
      {!img && <input type="file" onChange={handleChange} />}
      <h2>Username: {user.username}</h2>
      <h2>Password: {user.password}</h2>
    </div>
  );
};

export default Settings;
