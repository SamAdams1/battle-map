import React, { useState } from "react";

const Form = ({ formType, submitFunc }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-1/3 mx-auto text-center *:mt-4">
      <h1>{formType}</h1>
      <div>
        <h3 className="mb-2">Username</h3>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="text-center"
        />
      </div>
      <div>
        <h3 className="mb-2">Password</h3>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="text-center"
        />
      </div>
      <button
        onClick={() => submitFunc({ username, password })}
        disabled={!(username && password)}
      >
        {formType}
      </button>
    </div>
  );
};

export default Form;
