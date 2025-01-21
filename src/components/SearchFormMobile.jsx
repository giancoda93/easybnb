// IMPORT

// Stile
import "../styles/react-components/SearchFormMobile.css"

// Icone
import SearchIcon from "/search.svg?url"

// -------------------------------------------------------------
// Funzione componente
export default function SearchFormMobile() {
  return (
    <div className="search-mobile-container">
      <div className="search-mobile">
        <div className="search-button-container">
          <button className="search-btn">
            <span className="icon-container">
              <img src={SearchIcon} alt="search icon" />
            </span>
            <div className="search-btn-text">
              <p className="title">Dove si va?</p>
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