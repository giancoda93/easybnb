// IMPORT

// React
import { useState } from "react"

// Stile
import "../../styles/react-components/MobilePicker.css"

// Componenti
import GuestsPickerMobile from "./GuestsPickerMobile.jsx"

// ------------------------------------------------------------------------
// COSTANTI

const pickers = {
  destination: "",
  dates: "",
  guests: () => GuestsPickerMobile("Chi verrà?"),
}

// ------------------------------------------------------------------------
// Funzione componente
export default function MobilePicker({ text, value, formValue }) {
  const [collapsed, setCollapsed] = useState(true)

  // TODO: sistemare il collasso dei container: quando uno è aperto gli altri devono essere collassati
  // TODO: tenere presente che si possono creare oggetti con metodi facenti funzione dei componenti react (vedi sopra "pickers")

  return (
    <div className="mobile-picker" onClick={() => setCollapsed(false)}>
      {collapsed && (
        <div className="collapsed-container">
          <span className="mobile-picker-text">{text}</span>
          <span className="mobile-picker-value">{value}</span>
        </div>
      )}
      {!collapsed && (
        <div className="expanded-container">
          {pickers[formValue]()}
        </div>
      )}
    </div>
  );
}
