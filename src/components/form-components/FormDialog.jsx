// IMPORT

// Stile
import "../../styles/react-components/FormDialog.css"

// Icone
import CloseIcon from "../../icons/close.svg?react"
import SearchIcon from "../../icons/search.svg?react"

// Componenti
import MobilePicker from "../form-components/MobilePicker.jsx"

// React
import { useEffect, useState } from "react"

// Store
import { $showDialog, $mobilePickersCollapsed, $searchCriteria } from "../../store/store.js"
import { useStore } from "@nanostores/react"

// HANDLERS
function handleClose() {
  $showDialog.set(false)
  // quando viene chiuso il dialog i mobile pickers devono essere collassati
  $mobilePickersCollapsed.set({
    destination: true,
    dates: true,
    guests: true,
  })
}

// -------------------------------------------------------------
// Funzione componente dialog
export default function FormDialog() {

  const showDialog = useStore($showDialog)
  const searchCriteria = useStore($searchCriteria)

  useEffect(() => {
    
  }, [])
  
  return (
    <form className={`form-dialog-container ${!showDialog ? "dialog-hidden" : ""}`}>
      {/* La sezione superiore del dialog effettuerà uno slide verso il basso quando compare */}
      <div className="dialog-top">
        <button type="button" className="close-dialog" onClick={() => handleClose()}>
          <CloseIcon fill="black" width={14} height={14} />
        </button>
        <MobilePicker
          text="Dove"
          value="Sono Flessibile"
          formValue="destination"
          searchCriteria={searchCriteria}
        />
        <MobilePicker
          text="Quando"
          value="Aggiungi Date"
          formValue="dates"
          searchCriteria={searchCriteria}
        />
        <MobilePicker
          text="Chi"
          value="Aggiungi Ospiti"
          formValue="guests"
          searchCriteria={searchCriteria}
        />
      </div>
      {/* La sezione inferiore del dialog effettuerà uno slide verso l'alto quando compare */}
      <div className="dialog-bottom">
        <button type="button" className="dialog-reset-fields">
          <span className="reset-fields-text">Cancella tutto</span>
        </button>
        <button type="submit" className="dialog-submit-values">
          <SearchIcon fill="white" width={22} height={22} />
          <span className="submit-values-text">Cerca</span>
        </button>
      </div>
    </form>
  )
}