// IMPORT

// Stile
import "../../styles/react-components/GuestsSelector.css"

// React
import { useEffect, useState } from "react"

// Icone
import AddIcon from "../../icons/add.svg?react"
import RemoveIcon from "../../icons/remove.svg?react"

// Store
import { $searchCriteria, $guestsCount } from "../../store/store"
import { useStore } from "@nanostores/react"

// --------------------------------------------------------------------
// FUNZIONI
function chooseDecreaseClass(type, guestsCount) {
  if(guestsCount[type] <= 0) return "disabled"
  // se è presente un ospite non adulto non può esserci meno di un adulto
  if(type == "adults" && guestsCount[type] == 1) {
    for(let key in guestsCount) {
      if(key != "adults" && guestsCount[key] > 0) return "disabled"
    }
  }
  return "enabled"
}

function chooseIncreaseClass(count) {
  if(count > 14) return "disabled"
  return "enabled"
}

// --------------------------------------------------------------------
// Funzione componente guest selector
export default function GuestSelector({ title, description, type }) {

  const guestsCount = useStore($guestsCount)

  useEffect(() => {
    
  }, [guestsCount])

  // Handlers
  function increaseCount() {
    let temp = guestsCount[type] + 1  // estraggo il valore del conteggio per l'ospite e lo incremento
    $guestsCount.setKey(type, temp)   // assegno il nuovo valore allo store

    if(type !== "adults" && temp > 0) {
      // se viene aggiunto un ospite non adulto, deve esserci almeno un ospite adulto
      if ($guestsCount.get().adults == 0) $guestsCount.setKey("adults", 1)
      if ($guestsCount.get().adults > 0) return
    }
  }

  function decreaseCount() {
    let temp = guestsCount[type]

    // se è presente un ospite non adulto non può esserci meno di un adulto
    // TODO: quando aggiungo un neonato, un bambino o un animale gli adulti vengono impostati a 1. Non deve succedere se ci sono già adulti
    if(type == "adults" && guestsCount[type] == 1) {
      for(let key in guestsCount) {
        if(key != "adults" && guestsCount[key] > 0) {
          temp = temp <= 1 ? temp : (temp - 1)
          return
        }
      }
      temp -= 1

    } else {
      temp = temp <= 0 ? temp : (temp - 1)
    }

    $guestsCount.setKey(type, temp)
  }

  // Componente effettivo
  return (
    <div className="guest-selector">
      <div className="guest-type">
        <span className="guest-type-title">{title}</span>
        <span className="guest-type-description">{description}</span>
      </div>
      <div className="guest-number">
        <button 
          className={`change-number ${chooseDecreaseClass(type, guestsCount)}`}
          type="button"
          onClick={() => decreaseCount()}
        >
          <RemoveIcon fill="#6A6A6A" width={24} height={24} />
        </button>
        <span>{guestsCount[type]}</span>
        <button
          className={`change-number ${chooseIncreaseClass(guestsCount[type])}`}
          type="button"
          onClick={() => increaseCount()}
        >
          <AddIcon fill="#6A6A6A" width={22} height={22} />
        </button>
      </div>
    </div>
  )
}