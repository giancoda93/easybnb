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
export default function MobilePicker({ text, value, formValue, searchCriteria }) {
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
          {formValue == "destination" && <RegionPickerMobile title="Dove si va?" />}
          {formValue == "dates" && <DatePickerMobile title="Quando viaggerai?" />}
          {formValue == "guests" && <GuestsPickerMobile title="Chi verrà?" />}
        </div>
      )}
    </div>
  );
}
