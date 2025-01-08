// Icone
import CloseIcon from "/close.svg?url"

// Funzioni
import { fieldFocusHandler } from "../../utilities/searchFormFunctions"

// Componente
export default function SearchFormTextInput({ fieldId, label, placeholder, changeHandler, inputHandler, value, setValue, setters }) {
  return (
    <>
      <label className="text-input">
        <span className="text-input-label">{label}</span>
        <input
          id={`${fieldId}-input`}
          className="text-input-field" 
          type="text" placeholder={placeholder} 
          onChange={changeHandler} 
          value={value}
          onFocus={(e) => fieldFocusHandler(e.target.parentElement.parentElement.id, ...setters)}
          // TODO: va sistemato l'input handler per spostare il focus al campo successivo quando il valore è valido
          // onInput={inputHandler} 
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