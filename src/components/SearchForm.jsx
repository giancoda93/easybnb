// Import principali
import React, { useState, useEffect, useRef } from "react"

// Componenti
import RegionPickerDesktop from "./form-components/RegionPickerDesktop.jsx"

// Styles
import "../styles/react-components/SearchForm.css"

// Icone
import SearchIcon from "/search.svg?url"
import CloseIcon from "/close.svg?url"

// Handlers e funzioni
import { fieldFocusHandler, submitHandler, chooseChangeHandler, chooseValue, chooseSetValue } from "../utilities/searchFormFunctions.js"

// Costanti
import { searchFormFieldsData, fieldInitialState } from "../utilities/searchFormFunctions.js"

// ------------------------------------------------------------------------------
// Componente per input text
function TextInput({ label, placeholder, changeHandler, value, setValue, setters }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <label className="text-input">
        <span className="text-input-label">{label}</span>
        <input 
          className="text-input-field" 
          type="text" placeholder={placeholder} 
          onChange={changeHandler} 
          value={value}
          onFocus={(e) => {
            fieldFocusHandler(e.target.parentElement.parentElement.id, ...setters)
            setIsFocused(true)
          }}
          onBlur={() => setIsFocused(false)}
        />
      </label>
      {value && 
        <button type="button" className="cancel-input" onClick={() => setValue("")}>
          <img src={CloseIcon} alt="Cancel input icon" />
        </button>
      }
    </>
  )
}

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
              <TextInput
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
              {fieldData.id.includes("date") && <div>{/* Inserire qui il componente date picker */}</div>}
              {fieldData.id === "guests" && <div>{/* Inserire qui il componente guests picker */}</div>}
            </div>
          </div>
          {idx < 3 && <div className="field-separator"></div> }
        </React.Fragment>
      ))}
    </form>
  );
}
