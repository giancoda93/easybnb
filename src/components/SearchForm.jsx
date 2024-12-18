// Imports
import React, { useState, useEffect, useRef } from "react"

// Componenti
import RegionPickerDesktop from "./form-components/RegionPickerDesktop.jsx"

// Styles
import "../styles/react-components/SearchForm.css"

// Icons
import SearchIcon from "/search.svg?url"

// Handlers
const fieldClickHandler = (targetId, setFields, setButton, setForm, setPickers) => {
  setButton(true)
  setForm(false)

  setFields((prevState) => {
    let updatedState = { ...prevState }

    searchFormFieldsData.forEach(f => {
      if (targetId === f.id) {
        updatedState[f.id] = {
          hover: false,
          isActive: true,
          isFocused: true,
        }
      } else {
        updatedState[f.id] = {
          hover: true,
          isActive: false,
          isFocused: false,
        }
      }
    })

    return updatedState
  })

  setPickers((prevState) => {
    let updatedState = { ...prevState }

    searchFormFieldsData.forEach(f => {
      if (targetId === f.id) {
        updatedState[f.id] = true
      } else {
        updatedState[f.id] = false
      }
    })

    return updatedState
  })
}

// Costanti
const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "checkInDate", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "checkOutDate", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

const fieldInitialState = {
  hover: true,
  isActive: true,
  isFocused: false,
}

// ------------------------------------------------------------------------------
// Componente per input text
function TextInput({ label, placeholder, changeHandler, value }) {
  return (
    <label className="text-input">
      <span className="text-input-label">{label}</span>
      <input className="text-input-field" type="text" placeholder={placeholder} onChange={changeHandler} value={value}/>
    </label>
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
    <form id="search-form" ref={formRef} className={`${isFormActive ? "" : "inactive"}`}>
      {searchFormFieldsData.map((fieldData, idx) => (
        <React.Fragment key={fieldData.id}>
          <div className="field-container">
            <div
              id={fieldData.id}
              onClick={(e) => fieldClickHandler(e.currentTarget.id, setFieldsStates, setIsButtonWide, setIsFormActive, setPickersVisibility)}
              className={`field ${fieldData.id.includes("Date") ? "small-field" : "large-field"} ${fieldsStates[`${fieldData.id}`].hover ? "field-hover" : ""} ${fieldsStates[`${fieldData.id}`].isActive ? "" : "inactive"} ${fieldsStates[`${fieldData.id}`].isFocused ? "focused" : ""}`}
            >
              <TextInput
                label={fieldData.label}
                placeholder={fieldData.placeholder}
                changeHandler={(e) => changeHandler}
                value={
                  fieldData.id === "destination" ? destination :
                  fieldData.id === "checkInDate" ? checkInDate :
                  fieldData.id === "checkOutDate" ? checkOutDate :
                  fieldData.id === "guests" ? guests : null
                }
              />
              {fieldData.id === "guests" && (
                <button type="button" id="btn-submit" className={`${isButtonWide ? "wide" : ""}`}>
                  <img src={SearchIcon} alt="Search Icon" />
                  <span className="btn-label">Cerca</span>
                </button>
              )}
            </div>
            <div id={`${fieldData.id}-picker-wrapper`} className={`wrapper ${pickersVisibility[fieldData.id] ? "" : "hidden"}`}>
              {fieldData.id === "destination" && <RegionPickerDesktop />}
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
