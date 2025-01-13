// Import principali
import { useEffect, useState } from "react"

// Costanti
import { guestOptions } from "../../utilities/searchFormFunctions"

// Icone
import AddIcon from "/add.svg?url"
import RemoveIcon from "/remove.svg?url"

// Styles
import "../../styles/react-components/GuestsPickerDesktop.css"

// -------------------------------------------------------------------------------------

export default function GuestsPickerDesktop({ setGuests }) {
  // Stati
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  // gestione degli effetti dinamici al variare di ogni categoria di ospiti
  useEffect(() => {
    // Aggiunge un adulto se è presente un bambino, un neonato o un animale
    if (children > 0 || infants > 0 || pets > 0) {
      if (adults == 0) setAdults(1)
    }

    // Aggiorna lo stato "guests" quando vengono aggiunti ospiti
    let guests = { people: adults + children, infants: infants, pets: pets }

    function formatGuests(count, singular, plural) {
      if (count === 0) return ""
      return count === 1 ? `${singular}` : `${count} ${plural}`
    }

    let peopleString = formatGuests(guests.people, "1 ospite", "ospiti")
    let infantsString = formatGuests(guests.infants, "1 neonato", "neonati")
    let petsString = formatGuests(guests.pets, "1 animale", "animali")

    infantsString = infantsString ? `, ${infantsString}` : ""
    petsString = petsString ? `, ${petsString}` : ""
    
    setGuests(`${peopleString}${infantsString}${petsString}`)
  }, [adults, children, infants, pets])

  // funzioni

  function chooseValue(state) {
    // sceglie che stato associare ad ogni selettore
    switch (state) {
      case "adults":
        return adults
      case "children":
        return children
      case "infants":
        return infants
      case "pets":
        return pets
      default:
        return "-"
    }
  }

  // handlers

  function handleIncrease(state) {
    // sceglie la funzione da assegnare al click del tasto "+" per aumentare il valore
    switch (state) {
      case "adults":
        return adults < 15 ? () => setAdults(prev => prev += 1) : null
      case "children":
        return children < 15 ? () => setChildren(prev => prev += 1) : null
      case "infants":
        return infants < 15 ? () => setInfants(prev => prev += 1) : null
      case "pets":
        return pets < 15 ? () => setPets(prev => prev += 1) : null
      default:
        return "-"
    }
  }

  function handleDecrease(state) {
    // sceglie la funzione da assegnare al click del tasto "-" per diminuire il valore
    
    switch (state) {
      case "adults":
        if (children > 0 || infants > 0 || pets > 0) {
          return adults > 1 ? () => setAdults(prev => prev -= 1) : null  
        } else {
          return adults > 0 ? () => setAdults(prev => prev -= 1) : null
        }
      case "children":
        return children > 0 ? () => setChildren(prev => prev -= 1) : null
      case "infants":
        return infants > 0 ? () => setInfants(prev => prev -= 1) : null
      case "pets":
        return pets > 0 ? () => setPets(prev => prev -= 1) : null
      default:
        return null
    }
  }

  function setDecreaseBtnClasses(guestType) {
    // aggiunge le classi "disabled" ed "enabled" al bottone per ridurre il valore
    // in base allo stato che getisce
    if (guestType != "adults") {
      return `${chooseValue(guestType) == 0 ? "disabled" : "enabled"}`
    } else if (guestType == "adults") {
      if (children > 0 || infants > 0 || pets > 0) {
        return `${chooseValue(guestType) <= 1 ? "disabled" : "enabled"}`
      } else {
        return `${chooseValue(guestType) == 0 ? "disabled" : "enabled"}`
      }
    }
  }

  // componente effettivo
  return (
    <div className="guests-picker">
      {guestOptions.map((opt, idx) => (
        <div className="guest-selector" key={idx}>
          <div className="guest-type">
            <span className="guest-type-title">{opt.title}</span>
            <span className="guest-type-description">{opt.description}</span>
          </div>
          <div className="guest-number">
            <button 
              className={`change-number ${setDecreaseBtnClasses(opt.state)}`}
              type="button"
              onClick={handleDecrease(opt.state)}
            >
              <img src={RemoveIcon} alt="reduce" />
            </button>
            <span>{chooseValue(opt.state)}</span>
            <button
              className={`change-number ${chooseValue(opt.state) >= 15 ? "disabled" : "enabled"}`}
              type="button"
              onClick={handleIncrease(opt.state)}
            >
              <img src={AddIcon} alt="increase" />
            </button>
          </div>
        </div>
      ))}
      <button
        className="clear-guests"
        type="button"
        onClick={() => {
          setAdults(0)
          setChildren(0)
          setInfants(0)
          setPets(0)
        }}
      >
        Cancella valori
      </button>
    </div>
  )
}