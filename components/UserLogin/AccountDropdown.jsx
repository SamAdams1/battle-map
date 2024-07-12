import React, { useState } from 'react'


const AccountDropdown = ({user, setUser}) => {
  const [dropdownVis, setDropdownVis] = useState(false)

  return (
    <div className='accountDropdownDiv'>
      <button className="accountPfp" onClick={() => setDropdownVis(!dropdownVis)}>{(user.username).charAt(0)}</button>
      { dropdownVis && <div className='dropdown'>
        <h2>{user.username}</h2>
        <h3>Emperor</h3> {/* User Permission Level */}
        <button>Your Favorites</button>
        <button>Your Contributions</button>
        <button onClick={() => console.log(user)}>Settings</button>
        <button onClick={() => setUser({})}>Log out</button>

      </div>}
    </div>
  )
}

export default AccountDropdown