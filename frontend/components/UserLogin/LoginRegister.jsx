import React, { useState } from "react";
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../environment";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// form type can either be "Login" or "Register"
const LoginRegister = ({ formType, setUser, user }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const quitForm = () => {
    setErrorMsg("");
    navigate(-1);
  };

  const loginUser = async (data) => {
    // console.log({data})
    try {
      const response = await Axios.post(`${ENDPOINT}/userLogin`, data);
      if (response.data.length == 0) {
        // console.log(response)
        console.log("User: " + data.username + " not found.");
        setErrorMsg("Incorrect Credentials.");
      } else {
        // console.log(response.data.jwtToken);
        localStorage.setItem("JWT", response.data.jwtToken);
        // setUser(response.data.result[0]);
        console.log("LOGIN SUCCESS");
        // quitForm();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const token = localStorage.getItem("JWT");
      const response = await Axios.put(`${ENDPOINT}/userInfo`, { token });
      if (response.data.length == 0) {
        // console.log(response)
        // console.log("User: " + data.username + " not found.");
        setErrorMsg("Incorrect Credentials.");
      } else {
        setUser(response.data.user[0]);
        console.log("JWT SUCCESS");
        // console.log(response.data.user[0])
        quitForm();
      }
    } catch (error) {}
  };

  const registerUser = (data) => {
    data["favorites"] = {};
    data["contributions"] = [];
    data["pfp"] = "";
    data["lvl"] = 3;
    console.log(data);
    Axios.post(`${ENDPOINT}/registerUser`, data)
      .then((response) => {
        if (response.data.length == 0) {
          console.log(response);
          setErrorMsg("Registration Failed.");
        } else {
          loginUser(data);
          console.log("REGISTRATION SUCCESS");
          quitForm();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="z-50 absolute top-0 left-0 right-0 bottom-0 bg-slate-400">
      <button onClick={() => quitForm()} className="w-8 absolute right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      {user.loggedIn ? (
        <h1>Success!</h1>
      ) : (
        <>
          {formType == "Register" ? (
            <RegisterForm submitFunc={registerUser} />
          ) : (
            <LoginForm submitFunc={loginUser} />
          )}
          <p>{errorMsg}</p>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
