// Imports
import React, { useState, useEffect, useRef } from "react"

// Styles
import "../styles/react-components/SearchForm.css"

// Icons


// Handlers
const fieldClickHandler = (targetId, setFields, setButton, setForm) => {
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
}

// Functions


// Constants
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
function TextInput({ label, placeholder }) {
  return (
    <label className="text-input">
      <span className="text-input-label">{label}</span>
      <input className="text-input-field" type="text" placeholder={placeholder} />
    </label>
  )
}

export default function SearchForm() {
  const [fieldsStates, setFieldsStates] = useState({
    destination: { ...fieldInitialState },
    checkInDate: { ...fieldInitialState },
    checkOutDate: { ...fieldInitialState },
    guests: { ...fieldInitialState },
  })
  const [isButtonWide, setIsButtonWide] = useState(false)
  const [isFormActive, setIsFormActive] = useState(true)
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
              onClick={(e) => fieldClickHandler(e.currentTarget.id, setFieldsStates, setIsButtonWide, setIsFormActive)}
              className={`field ${fieldData.id.includes("Date") ? "small-field" : "large-field"} ${fieldsStates[`${fieldData.id}`].hover ? "field-hover" : ""} ${fieldsStates[`${fieldData.id}`].isActive ? "" : "inactive"} ${fieldsStates[`${fieldData.id}`].isFocused ? "focused" : ""}`}
            >
              <TextInput label={fieldData.label} placeholder={fieldData.placeholder} />
              {fieldData.id === "guests" && (
                <button type="button" id="btn-submit" className={`${isButtonWide ? "wide" : ""}`}>
                  <span className="btn-label">Cerca</span>
                </button>
              )}
            </div>
            <div id={`${fieldData.id}-picker-wrapper`} className="wrapper hidden">
              {fieldData.id === "destination" && <div>{/* Inserire qui il componente region picker */}</div>}
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
