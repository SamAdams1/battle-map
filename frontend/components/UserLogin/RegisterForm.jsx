import React, { useState } from "react";

const RegisterForm = ({ submitFunc }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="mx-auto text-center *:mt-4">
      <h1>Register</h1>
      <div className="*:mb-4">
        <div className="*:mb-1">
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="text-center"
          />
        </div>
        <div className="*:mb-1">
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-center"
          />
        </div>
        <div className="*:mb-1">
          <h3>Confirm password</h3>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-center"
          />
        </div>
      </div>
      <button
        onClick={() => submitFunc({ username, password })}
        disabled={!(username && password) || password !== confirmPassword}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
