import React from 'react'

const DBPopup = ({battle, country, addBattleLoc, setPopupVis}) => {
  let latLon = "";
  let year = 0;

  function addToDB() {
    latLon = latLon.replace("[","").replace("]","").replace(" ","").split(",")

    if (latLon.length > 1 && !isNaN(Number.parseFloat(latLon[0])) && !isNaN(Number.parseFloat(latLon[1]))) {
      latLon = latLon.map((num) => parseFloat(num))
      const data = { "latLon": latLon, "year": year }
      addBattleLoc(country, battle, data)
      setPopupVis(false)
    }
  }


  return (
    <div className="popup">
      <button onClick={() => setPopupVis(false)}>X</button>
      <h1>{country}</h1>
      <h1>{battle}</h1>
      <h2>Latitude, Longitude:</h2>
      <h3>No brackets or spaces.</h3>
      <input type="text" placeholder='Example: 34.37,62.17' onChange={(e) => latLon = e.target.value}/>
      <h2>Year:</h2>
      <h3>Negative Number if BC</h3>
      <input type="number" placeholder='Year' onChange={(e) => year = parseInt(e.target.value)}/>
      <br />
      <br />
      <button onClick={() => addToDB()}>Submit</button>


      {/* <select name="popupFunc" id="popupFunc" onChange={(e) => console.log(e.target.value)}>
        <option value="Add">Add</option>
        <option value="Report">Report</option>
        <option value="Delete">Delete</option>
      </select> */}
    </div>
  )
}

export default DBPopup