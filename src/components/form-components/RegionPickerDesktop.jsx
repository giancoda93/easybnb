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

// Store
import { $searchCriteria } from "../../store/store"
import { useStore } from "@nanostores/react"

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
function RegionCard({ image, text }) {
  return (
    <div className="region-card" onClick={() => $searchCriteria.setKey("destination", text)}>
      <img className="card-img" src={image} alt="img" />
      <p>{text}</p>
    </div>
  )
}

// Componente principale region picker
export default function RegionPickerDesktop() {

  const searchCriteria = useStore($searchCriteria)

  return (
    <div className="region-picker">
      {/* Se non viene scritto nulla mostro regioni */}
      {!searchCriteria.destination && 
        <>
          <h2 className="region-picker-desktop-title">Cerca per regione</h2>
          <div className="regions-container">
            {regions.map((region) => (
              <RegionCard
                image={region.image}
                text={region.text}
                key={region.image}
              />
            ))}
          </div>
        </>
      }
      {/* Se scrivo mostro i primi 10 risultati di città */}
      {searchCriteria.destination && (
        <div className="cities-list">
          {filteredCities(searchCriteria.destination, availableDestinations) && filteredCities(searchCriteria.destination, availableDestinations).map((city, idx) => (
            <div key={idx} className="listed-city">
              <div className="listed-city-link" onClick={() => $searchCriteria.setKey("destination", `${city.cityName}, ${city.countryCode}`)}>
                <img src={LocationIcon} alt="location icon" />
                <span>{`${city.cityName}, ${city.countryCode}`}</span>
              </div>
            </div>
          ))}
          {filteredCities(searchCriteria.destination, availableDestinations).length == 0 && (
            <div className="no-cities">
              <span>Non sono disponibili destinazioni.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
