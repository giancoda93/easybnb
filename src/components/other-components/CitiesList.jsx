// IMPORT

// Stile
import "../../styles/react-components/CitiesList.css"

// Funzioni
import { filteredCities } from "../../utilities/searchFormFunctions"

// Icone
import LocationIcon from "../../icons/location.svg?react"

// Store
import { $searchCriteria } from "../../store/store"

// ---------------------------------------------------------------------------------------------
// Funzione componente
export default function CitiesList({ searchCriteria, availableDestinations }) {

  return (
    <div className="cities-list">
      {filteredCities(searchCriteria.destination, availableDestinations) && filteredCities(searchCriteria.destination, availableDestinations).map((city, idx) => (
        <div key={idx} className="listed-city">
          <div
            className="listed-city-link"
            onClick={() => $searchCriteria.setKey("destination", `${city.cityName}, ${city.countryCode}`)}>
            <LocationIcon fill="black" />
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
  )
}
