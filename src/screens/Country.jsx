import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountries, getCountry } from '../services/countryinfo.js'
import CountryP from '../components/country.jsx'

export default function Country(props) {
    const { user } = props
    const { name} = useParams();
    const [country, setCountry] = useState({});
  
    const fetchCountry = async () => {
      try {
        const oneCountry = await getCountry(name );
        console.log(oneCountry);
        setCountry(oneCountry);
      } catch (error) {
        console.error(`Failed to fetch country - error: ${error}`);
      }
    };
  
    useEffect(() => {
      console.log('its rendering');
      fetchCountry();
    }, [name]);
 
return (
    <div className="Countrypage">
        <h1>{country.name && country.name.common} </h1>
        {country.flags && country.flags.png && <img src={country.flags.png} alt="Country-Flag" />}
        <div className="countryProductsform">
      <CountryP user={user} />
      

    </div>

        </div>
   

);

}