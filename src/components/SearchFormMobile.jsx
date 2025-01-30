// IMPORT

// React
import { useEffect } from "react"

// Stile
import "../styles/react-components/SearchFormMobile.css"

// Icone
import SearchIcon from "../icons/search.svg?react"

// Store
import { $showDialog } from "../store/store.js"
import { useStore } from "@nanostores/react"

// -------------------------------------------------------------
// HANDLERS
function handleClick() {
  $showDialog.set(true)
}

// -------------------------------------------------------------

// Funzione componente
export default function SearchFormMobile() {

  const showDialog = useStore($showDialog)

  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector(".search-mobile-container")
      if (el) {
        document.body.innerHTML += `<p>Display: ${getComputedStyle(el).display}</p>`
        document.body.innerHTML += `<p>Opacity: ${getComputedStyle(el).opacity}</p>`
        document.body.innerHTML += `<p>Visibility: ${getComputedStyle(el).visibility}</p>`
      } else {
        document.body.innerHTML += `<p>.search-mobile-container non trovato</p>`
      }
    })
  }, [])

  return (
    <div className="search-mobile-container">
      <div className="search-mobile">
        <div className="search-button-container"> 
          {/* Questo bottone mostrerà il form effettivo quando viene cliccato */}
          <button className="search-btn" type="button" onClick={() => handleClick()}>
            <span className="icon-container">
              <SearchIcon fill='black' width={30} height={30} />
            </span>
            <div className="search-btn-text">
              <p className="title">Dove si va?</p>
              {/* Il testo visualizzato negli span .choice sarà quello presente nei searchCriteria */}
              <span className="choice">Ovunque</span>
              <span className="separator">•</span>
              <span className="choice">Qualunque settimana</span>
              <span className="separator">•</span>
              <span className="choice">Aggiungi ospiti</span>
            </div>
          </button>
          </div>
      </div>
    </div>
  )
}