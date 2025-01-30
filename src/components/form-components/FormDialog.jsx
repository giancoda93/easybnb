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

// Funzioni
import { submitHandler } from "../../utilities/searchFormFunctions.js"

// -------------------------------------------------------------
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

function resetHandler() {
  $searchCriteria.setKey("destination", "")
  $searchCriteria.setKey("checkInDate", "")
  $searchCriteria.setKey("checkOutDate", "")
  $searchCriteria.setKey("guests", "")
}

function submitHandlerMobile(e) {
  e.preventDefault()

  submitHandler(e)

  $showDialog.set(false)
}

// -------------------------------------------------------------
// Funzione componente dialog
export default function FormDialog() {

  const showDialog = useStore($showDialog)
  const searchCriteria = useStore($searchCriteria)

  useEffect(() => {
    
  }, [])
  
  return (
    <form
      className={`form-dialog-container ${!showDialog ? "dialog-hidden" : ""}`}
      onSubmit={(e) => submitHandlerMobile(e, searchCriteria)}
    >
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
        <button type="button" className="dialog-reset-fields" onClick={() => resetHandler()}>
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