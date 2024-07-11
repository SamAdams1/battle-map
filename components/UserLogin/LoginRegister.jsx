import React, { useState } from 'react'
import Form from './Form'
import Axios from "axios"


const LoginRegister = ({formType, setFormType, setUser}) => {
  const [errorMsg, setErrorMsg] = useState("")

  const quitForm = () => {
    setErrorMsg("")
    setFormType("")
  }

  const login = (data) => {
    // console.log({data})
    Axios.get(`http://localhost:3005/${"userLogin"}`, {params: data}).then((response) => {
      if (response.data.length == 0) {
        // console.log(response)
        console.log("User: " + data.username + " not found.")
        setErrorMsg("Incorrect Credentials.")
      } else {
        setUser(response.data[0])
        console.log("LOGIN SUCCESS")
        quitForm()
      }
    }).catch((e) => console.log(e))
  }

  const register = (data) => {
    Axios.post(`http://localhost:3005/${"userRegister"}`, data)
    .then((response) => {
      if (response.data.length == 0) {
        console.log(response)
        setErrorMsg("Registration Failed.")
      } else {
        setUser(data)
        console.log("REGISTRATION SUCCESS")
        quitForm()
      }
    }).catch((e) => console.log(e))
  }


  return (
    <div className='loginRegister'>
      <button onClick={() => quitForm()}>X</button>
      { formType == "Register" ? (
          <Form formType={formType} submitFunc={register} />
      ) : (
          <Form formType={formType} submitFunc={login} />
      )}
      <p>{errorMsg}</p>
    </div>
  )
}

export default LoginRegister