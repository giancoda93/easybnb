// Import principali
import { filteredCities } from "../../utilities/searchFormFunctions"

// Database
import { getAccomodationLocations } from "../../db/dbAccomodations"

// Icone
import LocationIcon from "/location.svg?url"

// Styles
import "../../styles/react-components/RegionPickerDesktop.css"

// React
import { useEffect } from "react"

// Costanti
const regions = [
  {image: "../../../images/world.jpg", text: "Sono Flessibile"},
  {image: "../../../images/usa.webp", text: "Stati Uniti"},
  {image: "../../../images/spain.webp", text: "Spagna"},
  {image: "../../../images/south-america.webp", text: "America del Sud"},
  {image: "../../../images/uk.webp", text: "Regno Unito"},
  {image: "../../../images/africa.webp", text: "Africa"},
]

const availableDestinations = await getAccomodationLocations()  // array che contiene tutte le destinazioni disponibili

// -----------------------------------------------------------------------------------------------------
// Componente region card
function RegionCard({ image, text, setDestination }) {
  return (
    <div className="region-card" onClick={() => setDestination(text)}>
      <img className="card-img" src={image} alt="img" />
      <p>{text}</p>
    </div>
  )
}

// Componente principale region picker
export default function RegionPickerDesktop({ destination, setDestination }) {

  return (
    <div className="region-picker">
      {/* Se non viene scritto nulla mostro regioni */}
      {!destination && 
        <>
          <h2>Cerca per regione</h2>
          <div className="regions-container">
            {regions.map((region) => (
              <RegionCard
                image={region.image}
                text={region.text}
                key={region.image}
                setDestination={setDestination}
              />
            ))}
          </div>
        </>
      }
      {/* Se scrivo mostro i primi 10 risultati di città */}
      {destination && (
        <div className="cities-list">
          {filteredCities(destination, availableDestinations) && filteredCities(destination, availableDestinations).map((city, idx) => (
            <div key={idx} className="listed-city">
              <div className="listed-city-link" onClick={() => setDestination(`${city.cityName}, ${city.countryCode}`)}>
                <img src={LocationIcon} alt="location icon" />
                <span>{`${city.cityName}, ${city.countryCode}`}</span>
              </div>
            </div>
          ))}
          {filteredCities(destination, availableDestinations).length == 0 && (
            <div className="no-cities">
              <span>Non sono disponibili destinazioni.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
