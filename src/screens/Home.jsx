import { useState, useEffect } from 'react'
import { getCountries, getCountry } from '../services/countryinfo.js'



export default function Home() {
    const [countries, setCountries] = useState([])   
    console.log('render')
    const fetchCountries = async () => {
        try {
          const allCountries = await getCountries()
          console.log(allCountries); // Add this line to check the value of allCountries
          setCountries(allCountries)
        } catch (error) {
          // Handle the error, if needed
          console.error(`Failed to fetch countries - error: ${error}`)
        }
      }
    useEffect(() => {
        console.log('its rendering')
        fetchCountries()
    },[])

    const handleSubmit = () => {
      
    }
    

return (
    <div className="homescreen">
    <h1>World-Products</h1>
    <h2>Please select the country where you would like to make your product purchases</h2>
    <div className='allcountries'>
    {countries
  .filter((country) => country.region === 'Europe')
  .map((country) => (
    <ul key={country._id}>
          <a href={`/${country.name.common}`}>
      {country.name.common} {country.flag}
       {/* <img src={country.flags.png} alt="Country-Flag"/> */}
       </a>
    </ul>
  ))}


    </div>

    
    </div>
);
};

