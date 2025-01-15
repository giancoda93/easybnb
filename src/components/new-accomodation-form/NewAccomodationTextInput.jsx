// IMPORT
// React
import { useEffect, useState } from "react"

// Stile
import "../../styles/react-components/NewAccomodationTextInput.css"

// Icone
import AddIconWhite from "/add-white.svg?url"

// ---------------------------------------------------------------------------------------
// Funzione componente
export default function NewAccomodationTextInput({ label, dataType, state, setState }) {
  const [text, setText] = useState("")

  // useEffect(() => {
  //   console.log(label, state)
  // }, [state])

  // useEffect(() => {
  //   console.log(label, "stato sostitutivo", text)
  // }, [text])

  // Handlers
  function changeHandler(value) {
    if(dataType != "array") {
      setState(value)
    } else {
      setText(value)
    }
  }

  function clickHandler() {
    setState(prev => [...prev, text])
    setText("")
  }

  function deleteElement(element) {
    let modifiedArray = []
    state.forEach(el => {
      if(el != element) {
        modifiedArray.push(el)
      }
    })
    setState([...modifiedArray])
  }
  
  return (
    <>
      <label className="accomodation-text-input">
        <div className="label-input-container">
          <span className="accomodation-label">{label}</span>
          <input
            className="accomodation-input-field" 
            type="text"
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
          {state.map(el => (
            <div key={el} className="single-value" onClick={() => deleteElement(el)}>{el}</div>
          ))}
        </div>
      )}
    </>
  );
}
 