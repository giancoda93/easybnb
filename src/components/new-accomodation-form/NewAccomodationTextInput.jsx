// IMPORT
// Stile
import "../../styles/react-components/NewAccomodationTextInput.css"

// Icone
import AddIconWhite from "/add-white.svg?url"

// ---------------------------------------------------------------------------------------
// Funzione componente
export default function NewAccomodationTextInput({ label, dataType, state, setState }) {

  console.log("State ricevuto", state)
  
  function changeHandler(value) {
    console.log("Variazione valore", value)
    setState(value)
  }

  return (
    <label className="accomodation-text-input">
      <div className="label-input-container">
        <span className="accomodation-label">{label}</span>
        <input
          className="accomodation-input-field" 
          type="text"
          value={state}
          onChange={(e) => changeHandler(e.target.value)}
        />
      </div>
      {dataType == "array" && (
        <button className="btn-add-array" type="button">
          <img src={AddIconWhite} alt="add" />
        </button>
      )}
    </label>
  );
}
 