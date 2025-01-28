// IMPORT

// Stile
import "../../styles/react-components/RegionPickerMobile.css"

// Icone
import SearchIcon from "../../icons/search.svg?react"

// Store
import { $searchCriteria } from "../../store/store.js"
import { useStore } from "@nanostores/react"

// Componenti
import CitiesList from "../other-components/CitiesList.jsx"

// Database
import { getAccomodationLocations } from "../../db/dbAccomodations.js"


// --------------------------------------------------------------------
// COSTANTI
const availableDestinations = await getAccomodationLocations()  // array che contiene tutte le destinazioni disponibili

// --------------------------------------------------------------------
// Funzione componente
export default function RegionPickerMobile({ title }) {

  const searchCriteria = useStore($searchCriteria)

  return (
    <>
      <div className="region-picker-mobile">
        <h2>{title}</h2>
        <label className="text-input-mobile">
          <div className="icon-container">
            <SearchIcon fill="black" width={20} height={20} />
          </div>
          <input
            type="text"
            placeholder="Cerca destinazioni"
            onChange={(e) => $searchCriteria.setKey("destination", e.target.value)}
            value={searchCriteria.destination}
          />
        </label>
        {searchCriteria.destination && (
          <CitiesList
            searchCriteria={searchCriteria}
            availableDestinations={availableDestinations}
          />
        )}
      </div>
    </>
  );
}
