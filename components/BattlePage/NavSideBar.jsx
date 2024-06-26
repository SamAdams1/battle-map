
const NavSideBar = ({countryList}) => {


  let lastLetter = "";
  return (
    <div className='navCountry'>
      <a href="#Top" className='topBtn'>(Top)</a>
      { countryList.map((country) => {
        return ( 
          <div key={country+"nav"}>
            {lastLetter != country.at(0) && <h2>{lastLetter = country.at(0)}</h2>}
            <p><a href={'#'+country} className='navBtn'>{country}</a></p>
          </div>
         )
      })}
    </div>
  )
}

export default NavSideBar