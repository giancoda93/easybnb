// IMPORT

// React
import { useEffect, useState } from "react"

// Stile
import "../../styles/react-components/MobilePicker.css"

// Componenti
import RegionPickerMobile from "./RegionPickerMobile.jsx"
import DatePickerMobile from "./DatePickerMobile.jsx"
import GuestsPickerMobile from "./GuestsPickerMobile.jsx"

// Store
import { useStore } from "@nanostores/react"
import { $mobilePickersCollapsed } from "../../store/store.js"

// ------------------------------------------------------------------------
// COSTANTI

const pickers = {
  // definisce quale delle tre funzioni componente utilizzare in base al picker attuale
  destination: () => RegionPickerMobile("Dove si va?"),
  dates: () => DatePickerMobile("Quando viaggerai?"),
  guests: () => GuestsPickerMobile("Chi verrà?"),
}

// ------------------------------------------------------------------------
// HANDLERS

function handleClick(pickers, formValue) {
  // Al click su un picker collassato lo espande e collassa gli altri
  Object.keys(pickers).forEach(key => {
    if(key == formValue) {
      $mobilePickersCollapsed.setKey(key, false)
    } else {
      $mobilePickersCollapsed.setKey(key, true)
    }
  })
}

// ------------------------------------------------------------------------
// Funzione componente
export default function MobilePicker({ text, value, formValue }) {
  const mobilePickersCollapsed = useStore($mobilePickersCollapsed)

  return (
    <div className="mobile-picker" onClick={() => handleClick(mobilePickersCollapsed, formValue)}>
      {mobilePickersCollapsed[formValue] && (
        <div className="collapsed-container">
          <span className="mobile-picker-text">{text}</span>
          <span className="mobile-picker-value">{value}</span>
        </div>
      )}
      {!mobilePickersCollapsed[formValue] && (
        <div className="expanded-container">
          {pickers[formValue]()}
        </div>
      )}
    </div>
  );
}
