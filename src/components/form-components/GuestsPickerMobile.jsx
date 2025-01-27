// IMPORT

// Componenti
import GuestSelector from "./GuestSelector.jsx"

// Stile
import "../../styles/react-components/GuestsPickerMobile.css"

// Costanti
import { guestOptions } from "../../utilities/searchFormFunctions"

// Funzioni
import { guestsString } from "../../utilities/searchFormFunctions"

// Store
import { $guestsCount } from "../../store/store"

// --------------------------------------------------------------------
// Handlers
function handleClick() {
  $guestsCount.setKey("adults", 0)
  $guestsCount.setKey("children", 0)
  $guestsCount.setKey("infants", 0)
  $guestsCount.setKey("pets", 0)
}

// --------------------------------------------------------------------
// Funzione componente
export default function GuestsPickerMobile(title) {
  // TODO: va aggiunta la generazione della stringa da inserire in "setGuests" (vedere componente "GuestsPickerDesktop" come esempio)

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
        <button
          className="clear-guests"
          type="button"
          onClick={() => console.log(guestsString())}
        >
        Mostra conteggio
      </button>
      </div>
    </>
  );
}
