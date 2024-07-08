import React from 'react'

const DBPopup = (battleName) => {
  
  return (
    <div className="popup">
    <button onClick={() => setPopupVis(false)}>X</button>
    <h1>{battleCountry}</h1>
    <h1>{selectedBattle}</h1>
    <h2>Entry Format: Latitude, Longitude</h2>
    <h2>No brackets or spaces.</h2>
    <input type="text" placeholder='Example: 34.37,62.17' onChange={(e) => idk(e.target.value)}/>
    <button onClick={addToDB}>Submit</button>


    {/* <select name="popupFunc" id="popupFunc" onChange={(e) => console.log(e.target.value)}>
      <option value="Add">Add</option>
      <option value="Report">Report</option>
      <option value="Delete">Delete</option>
    </select> */}
  </div>
  )
}

export default DBPopup