import React, { useState } from "react";
import Form from "./Form";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

// form type can either be "Login" or "Register"
const LoginRegister = ({ formType, setUser, user }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const quitForm = () => {
    setErrorMsg("");
    navigate(-1);
  };

  const loginUser = (data) => {
    // console.log({data})
    Axios.get(`http://localhost:3005/${"userLogin"}`, { params: data })
      .then((response) => {
        if (response.data.length == 0) {
          // console.log(response)
          console.log("User: " + data.username + " not found.");
          setErrorMsg("Incorrect Credentials.");
        } else {
          setUser(response.data[0]);
          console.log("LOGIN SUCCESS");
          quitForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const registerUser = (data) => {
    data["favorites"] = {};
    data["contributions"] = {};
    console.log(data);
    Axios.post(`http://localhost:3005/${"registerUser"}`, data)
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
    <div className="loginRegister">
      <button onClick={() => quitForm()}>X</button>
      {Object.keys(user).length >= 1 ? (
        <h1>Success!</h1>
      ) : (
        <>
          {formType == "Register" ? (
            <Form formType={formType} submitFunc={registerUser} />
          ) : (
            <Form formType={formType} submitFunc={loginUser} />
          )}
          <p>{errorMsg}</p>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
