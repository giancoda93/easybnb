// IMPORT

// Stile
import "../../styles/react-components/GuestsPickeMobile.css"

// Costanti
import { guestOptions } from "../../utilities/searchFormFunctions"

// Icone
import AddIcon from "../../icons/add.svg?react"
import RemoveIcon from "../../icons/remove.svg?react"

// --------------------------------------------------------------------
// Funzione componente guest selector
function GuestSelector({ title, description }) {
  return (
    <div className="guest-selector">
      <div className="guest-type">
        <span className="guest-type-title">{title}</span>
        <span className="guest-type-description">{description}</span>
      </div>
      <div className="guest-number">
        <button 
          className="change-number"
          type="button"
        >
          <RemoveIcon />
        </button>
        <span>0</span>
        <button
          className="change-number"
          type="button"
        >
          <AddIcon />
        </button>
      </div>
    </div>
  )
}

// Funzione componente
export default function GuestsPickerMobile(title) {
  return (
    <>
      <div className="region-picker-mobile">
        <h2>{title}</h2>
        {guestOptions.map((opt, idx) => (
          <GuestSelector
            title={opt.title}
            description={opt.description}
          />
        ))}
      </div>
    </>
  );
}
