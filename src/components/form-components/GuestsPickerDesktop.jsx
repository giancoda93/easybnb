// IMPORT

// Componenti
import GuestSelector from "./GuestSelector.jsx"

// Costanti
import { guestOptions } from "../../utilities/searchFormFunctions"

// Store
import { $guestsCount } from "../../store/store.js"

// Styles
import "../../styles/react-components/GuestsPickerDesktop.css"

// --------------------------------------------------------------------
// Handlers
function handleClick() {
  $guestsCount.setKey("adults", 0)
  $guestsCount.setKey("children", 0)
  $guestsCount.setKey("infants", 0)
  $guestsCount.setKey("pets", 0)
}

// -------------------------------------------------------------------------------------

export default function GuestsPickerDesktop() {

  // componente effettivo
  return (
    <div className="guests-picker">
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
  )
}