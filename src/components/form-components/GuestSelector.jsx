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

  // TODO: sistemare e utilizzare questo componente anche per la versione desktop

  const guestsCount = useStore($guestsCount)

  useEffect(() => {
    
  }, [guestsCount])

  // Handlers
  function increaseCount() {
    let temp = guestsCount[type]

    if(type !== "adults" && temp == 0) {
      // se viene aggiunto un ospite non adulto, deve esserci almeno un ospite adulto
      $guestsCount.setKey("adults", 1)
    }

    $guestsCount.setKey(type, temp + 1)
  }

  function decreaseCount() {
    let temp = guestsCount[type]

    // se è presente un ospite non adulto non può esserci meno di un adulto
    if(type == "adults" && guestsCount[type] == 1) {
      for(let key in guestsCount) {
        if(key != "adults" && guestsCount[key] > 0) {
          console.log("qui")
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