import React, { useState } from 'react'


const AccountDropdown = ({user}) => {
  const [dropdownVis, setDropdownVis] = useState(false)

  return (
    <div>
      <div className="accountPfp">
        <button onClick={() => setDropdownVis(!dropdownVis)}>{(user.username).charAt(0)}</button>
      </div>
      { dropdownVis && <div>
        <h1>{user.username}</h1>
      </div>}
    </div>
  )
}

export default AccountDropdown