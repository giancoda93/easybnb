// IMPORT

// Componenti
import GuestSelector from "./GuestSelector.jsx"

// Stile
import "../../styles/react-components/GuestsPickerMobile.css"

// Costanti
import { guestOptions } from "../../utilities/searchFormFunctions"

// Store
import { $searchCriteria, $guestsCount } from "../../store/store"

// --------------------------------------------------------------------
function handleClick() {
  $guestsCount.setKey("adults", 0)
  $guestsCount.setKey("children", 0)
  $guestsCount.setKey("infants", 0)
  $guestsCount.setKey("pets", 0)
}

// Funzione componente
export default function GuestsPickerMobile(title) {

  return (
    <>
      <div className="guests-picker-mobile">
        <h2>{title}</h2>
        {guestOptions.map((opt, idx) => (
          <GuestSelector
            title={opt.title}
            description={opt.description}
            type={opt.state}
            key={idx}
          />
        ))}
        <button
          className="clear-guests"
          type="button"
          onClick={() => handleClick()}
        >
        Cancella valori
      </button>
      </div>
    </>
  );
}
