import React, { useState } from 'react'

const Form = ({formType, submitFunc}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <h1>{formType}</h1>
      <h2>Username</h2>
      <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
      <h2>Password</h2>
      <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
      
        <button 
          onClick={() => submitFunc({username, password})} 
          disabled={!(username && password)}
        >{formType}</button>
    </div>
  )
}

export default Form