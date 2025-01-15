// IMPORT
// React
import { useState } from "react"

// Stile
import "../../styles/react-components/NewAccomodationTextInput.css"

// Icone
import AddIconWhite from "/add-white.svg?url"

// ---------------------------------------------------------------------------------------
// Funzione componente
export default function NewAccomodationTextInput({ label, dbName, dataType, state, setState }) {
  const [text, setText] = useState("")

  // Handlers
  function changeHandler(value) {
    // aggiorna lo stato direttamente se il tipo di dato non è un array, altrimenti
    // passa la stringa in uno stato intermedio da aggiungere poi all'array
    if(dataType != "array") {
      setState(value)
    } else {
      setText(value)
    }
  }

  function clickHandler() {
    // aggiunge l'input all'array dello stato se il dataType è "array"
    let element = dbName === "ratings" ? parseInt(text) : text

    setState(prev => [...prev, element])
    setText("")
  }

  function deleteElement(idx) {
    // cancella un elemento dell'array dello stato
    let tempArray = [...state]
    let modifiedArray = tempArray.filter((_, index) => index != idx)

    setState([...modifiedArray])
  }


  return (
    <>
      <label className="accomodation-text-input">
        <div className="label-input-container">
          <span className="accomodation-label">{label}</span>
          <input
            className="accomodation-input-field" 
            type={dataType == "number" ? "number" : "text"}
            value={dataType === "array" ? text : state}
            onChange={(e) => changeHandler(e.target.value)}
          />
        </div>
        {dataType == "array" && (
          <button className="btn-add-array" type="button" onClick={() => clickHandler()}>
            <img src={AddIconWhite} alt="add" />
          </button>
        )}
      </label>
      {dataType == "array" && (
        <div className="added-values">
          {state.map((el, idx) => (
            <div key={idx} className="single-value" onClick={() => deleteElement(idx)}>
              <span className="delete-symbol">✕</span> 
              <span>{`${el}${dbName == "ratings" ? " ★" : ""}`}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
 