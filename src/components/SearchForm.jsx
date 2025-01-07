// Import principali
import React, { useState, useEffect, useRef } from "react"

// Componenti
import SearchFormTextInput from "./form-components/SearchFormTextInput.jsx"
import RegionPickerDesktop from "./form-components/RegionPickerDesktop.jsx"
import DatePickerDesktop from "./form-components/DatePickerDesktop.jsx"

// Styles
import "../styles/react-components/SearchForm.css"

// Icone
import SearchIcon from "/search.svg?url"

// Handlers e funzioni
import { submitHandler, chooseChangeHandler, chooseValue, chooseSetValue, stringToDate } from "../utilities/searchFormFunctions.js"

// Costanti
import { searchFormFieldsData, fieldInitialState } from "../utilities/searchFormFunctions.js"

// ------------------------------------------------------------------------------
// Componente form
export default function SearchForm() {
  
  // Stati per classi di stile
  const [fieldsStates, setFieldsStates] = useState({
    destination: { ...fieldInitialState },
    checkInDate: { ...fieldInitialState },
    checkOutDate: { ...fieldInitialState },
    guests: { ...fieldInitialState },
  })
  const [pickersVisibility, setPickersVisibility] = useState({
    destination: false,
    checkInDate: false,
    checkOutDate: false,
    guests: false,
  })
  const [isButtonWide, setIsButtonWide] = useState(false)
  const [isFormActive, setIsFormActive] = useState(true)

  // Stati per valori form
  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState("")

  // Ref
  const formRef = useRef(null)

  // Gestione del click globale
  useEffect(() => {
    // TODO: fare in modo che quando viene cliccato il bottone per cancellare il valore input
    // non venga perso il focus sul campo
    const globalClickHandler = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        // Click esterno al form
        setFieldsStates({
          destination: { ...fieldInitialState },
          checkInDate: { ...fieldInitialState },
          checkOutDate: { ...fieldInitialState },
          guests: { ...fieldInitialState },
        })
        setPickersVisibility({
          destination: false,
          checkInDate: false,
          checkOutDate: false,
          guests: false,
        })
        setIsButtonWide(false)
        setIsFormActive(true)
      }
    }
  
    // Aggiungi event listener per il click
    document.addEventListener("click", globalClickHandler)

    // Rimuovi event listener al cleanup
    return () => document.removeEventListener("click", globalClickHandler)
  }, [])

  // Gestione passaggio al campo successivo all'inserimento di un valore in quello precedente
  useEffect(() => {
    
  }, [destination, checkInDate, checkOutDate, guests])

  return (
    <form 
      id="search-form" 
      ref={formRef} 
      className={`${isFormActive ? "" : "inactive"}`}
      onSubmit={(e) => submitHandler(e, destination, checkInDate, checkOutDate, guests)}
    >
      {searchFormFieldsData.map((fieldData, idx) => (
        <React.Fragment key={fieldData.id}>
          <div className="field-container">
            <div
              id={fieldData.id}
              className={`field ${fieldData.id.includes("Date") ? "small-field" : "large-field"} ${fieldsStates[`${fieldData.id}`].hover ? "field-hover" : ""} ${fieldsStates[`${fieldData.id}`].isActive ? "" : "inactive"} ${fieldsStates[`${fieldData.id}`].isFocused ? "focused" : ""}`}
            >
              <SearchFormTextInput
                fieldId={fieldData.id}
                label={fieldData.label}
                placeholder={fieldData.placeholder}
                changeHandler={chooseChangeHandler(fieldData.id, setDestination, setCheckInDate, setCheckOutDate, setGuests)}
                value={chooseValue(fieldData.id, destination, checkInDate, checkOutDate, guests)}
                setValue={chooseSetValue(fieldData.id, setDestination, setCheckInDate, setCheckOutDate, setGuests)}
                setters={[setFieldsStates, setIsButtonWide, setIsFormActive, setPickersVisibility]}
              />
              {fieldData.id === "guests" && (
                <button type="submit" id="btn-submit" className={`${isButtonWide ? "wide" : ""}`}>
                  <img src={SearchIcon} alt="Search Icon" />
                  <span className="btn-label">Cerca</span>
                </button>
              )}
            </div>
            <div id={`${fieldData.id}-picker-wrapper`} className={`wrapper ${pickersVisibility[fieldData.id] ? "" : "hidden"}`}>
              {fieldData.id === "destination" && <RegionPickerDesktop setDestination={setDestination} />}
              {fieldData.id.includes("Date") && (
                <DatePickerDesktop
                  fieldId={fieldData.id}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  setCheckInDate={setCheckInDate} 
                  setCheckOutDate={setCheckOutDate}
                />
                )}
              {fieldData.id === "guests" && <div>{/* Inserire qui il componente guests picker */}</div>}
            </div>
          </div>
          {idx < 3 && <div className="field-separator"></div> }
        </React.Fragment>
      ))}
    </form>
  );
}
