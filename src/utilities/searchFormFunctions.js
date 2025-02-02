// IMPORT

// Funzioni
import { eachDayOfInterval, isBefore } from 'date-fns'

// Store
import { $searchCriteria, $guestsCount, $accomodations, $dbError } from '../store/store'

// Database
import { getAccomodationsByCity, getAllAccomodations } from '../db/dbAccomodations'

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// COSTANTI

// --------------------------------------------------------------------------------------------------------
// dati per costruire i campi del form
export const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "checkInDate", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "checkOutDate", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

// --------------------------------------------------------------------------------------------------------
// valore di default degli stati dei componenti del form
export const fieldInitialState = {
  hover: true,
  isActive: true,
  isFocused: false,
}

// --------------------------------------------------------------------------------------------------------
// conversione da numero a nome del giorno della settimana
export const dayName = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
]

// --------------------------------------------------------------------------------------------------------
// conversione da numero a nome del mese
export const monthName = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
]

// --------------------------------------------------------------------------------------------------------
// opzioni per selezione ospiti
export const guestOptions = [
  { title: "Adulti", description: "Da 13 anni in su", state: "adults" },
  { title: "Bambini", description: "Da 2 a 12 anni", state: "children" },
  { title: "Neonati", description: "Fino a 2 anni", state: "infants" },
  { title: "Animali domestici", description: "Animali di servizio in viaggio?", state: "pets" },
]

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// HANDLERS

// --------------------------------------------------------------------------------------------------------
// gestisce le classi di stile per i componenti del form quando un input è in focus
export const fieldFocusHandler = (targetId, setFields, setButton, setForm, setPickers) => {  
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

  setPickers((prevState) => {
    let updatedState = { ...prevState }

    searchFormFieldsData.forEach(f => {
      if (targetId === f.id) {
        updatedState[f.id] = true
      } else {
        updatedState[f.id] = false
      }
    })

    return updatedState
  })
}

export async function submitHandler(e) {
  e.preventDefault()

  const searchCriteria = $searchCriteria.get()

  if (searchCriteria.destination) {
    let accomodationsByCity = await getAccomodationsByCity(searchCriteria.destination)

    $accomodations.set([ ...accomodationsByCity.response ])
    $dbError.set(accomodationsByCity.error)

  } else {
    let allAccomodations = await getAllAccomodations()

    $accomodations.set([ ...allAccomodations.response ])
    $dbError.set(allAccomodations.error)
  }
}

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// FUNZIONI

// --------------------------------------------------------------------------------------------------------
// sceglie quale funzione click handler assegnare ad ogni campo del form
export const chooseChangeHandler = (fieldId) => {
  switch (fieldId) {
    case searchFormFieldsData[0].id:
      return (e) => $searchCriteria.setKey("destination", e.target.value)
    case searchFormFieldsData[1].id:
      return (e) => $searchCriteria.setKey("checkInDate", e.target.value)
    case searchFormFieldsData[2].id:
      return (e) => $searchCriteria.setKey("checkOutDate", e.target.value)
    case searchFormFieldsData[3].id:
      return (e) => $searchCriteria.setKey("guests", e.target.value)
    default:
      return (e) => console.log("Change handler non definito")
  }
}

// --------------------------------------------------------------------------------------------------------
// sceglie come gestire il passaggio del focus all'elemento successivo del form
// TODO: funziona ma non quando viene cliccato un giorno dal calendario. DA SISTEMARE
export const chooseInputHandler = (fieldId) => {
  switch (fieldId) {
    case searchFormFieldsData[0].id:
      return (e) => {
        if (e.target.value.length > 5) document.getElementById(`${searchFormFieldsData[1].id}-input`).focus()
      }
    case searchFormFieldsData[1].id:
      return (e) => {
        if ((/\d{1,2}-\d{1,2}-\d{4}/).test(e.target.value)) document.getElementById(`${searchFormFieldsData[2].id}-input`).focus()
      }
  }
}

// --------------------------------------------------------------------------------------------------------
// sceglie quale stato associare ad un campo input
export const chooseValue = (fieldId) => {
  switch (fieldId) {
    case "destination":
      return $searchCriteria.get().destination
    case "checkInDate":
      return $searchCriteria.get().checkInDate
    case "checkOutDate" :
      return $searchCriteria.get().checkOutDate
    case "guests":
      return $searchCriteria.get().guests
    default:
      return null
  }
}

// --------------------------------------------------------------------------------------------------------
// sceglie quale proprietà di di $searchCriteria va modificata
export const chooseSetValue = (fieldId) => {
  switch (fieldId) {
    case "destination":
      return function setDestination(value) {$searchCriteria.setKey("destination", value)}
    case "checkInDate":
      return function setCheckInDate(value) {$searchCriteria.setKey("checkInDate", value)}
    case "checkOutDate" :
      return function setCheckOutDate(value) {$searchCriteria.setKey("checkOutDate", value)}
    case "guests":
      return function setGuests(value) {$searchCriteria.setKey("guests", value)}
    default:
      return null
  }
}

// --------------------------------------------------------------------------------------------------------
// converte una data in un oggetto con il formato: { year: yyyy, month: mm, day: d }
export function dayToObject(date) {
  
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Mesi indicizzati da 0
    day: date.getDate(),
    weekDay: {
      name: dayName[date.getDay()],
      num: date.getDay(),
    }
  }
}

// --------------------------------------------------------------------------------------------------------
// genera un calendario, sotto forma di array, di due anni a partire dal mese corrente.
// ogni elemento dell'array è un oggetto contenente anno, mese, giorno, e nome del giorno
export function generateMonth(year, month) {
  const start = new Date(year, month - 1, 1)
  const end = new Date(year, month, 0)

  return eachDayOfInterval({ start, end }).map(date => dayToObject(date))
}

// --------------------------------------------------------------------------------------------------------
// restituisce un array di 42 elementi posizionando i giorni del mese
// in base al giorno della settimana
export function getMonthGrid(month) {
  const monthGrid = [...month]
  
  const firstDay = month[0].weekDay.num
  const lastDay = month[month.length - 1].weekDay.num
  const numDaysBefore = firstDay == 0 ? 6 : (firstDay - 1)
  const numDaysAfter = lastDay == 0 ? 0 : (7 - lastDay)

  for(let i = 0; i < numDaysBefore; i++) monthGrid.unshift("")
  for(let i = 0; i < numDaysAfter; i++) monthGrid.push("")

  return monthGrid
}

// --------------------------------------------------------------------------------------------------------
// converte gli oggetti data custom in date classiche e li confronta
// restituendo true se il primo argomento data è precedente al
// secondo argomento data
export function isDateObjBefore(dateObj1, dateObj2) {
  const date1 = new Date(dateObj1.year, dateObj1.month - 1, dateObj1.day)
  const date2 = new Date(dateObj2.year, dateObj2.month - 1, dateObj2.day)

  return isBefore(date1, date2)
}

// --------------------------------------------------------------------------------------------------------
// converte una stringa composta da DD/MM/YYYY in una data JavaScript 
// (non è necessario che siano due cifre per giorni e mesi)
export function stringToDate(string) {
  const dateArray = string.split("-")

  return new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
}

// --------------------------------------------------------------------------------------------------------
// filtra le città mostrate nella ricerca in base alla stringa inserita nell'input
export function filteredCities(input, cities) {
  const matchedCities = cities.filter(city => {
    if (city.cityName.slice(0, input.length).toLowerCase() == input.toLowerCase()) {
      return city
    }
  })
  return matchedCities.sort((a, b) => a.cityName.localeCompare(b.cityName)).slice(0, 10)
}

// --------------------------------------------------------------------------------------------------------
// genera la stringa per gli ospiti in base al loro conteggio
export function guestsString() {
  const guestsCount = $guestsCount.get()

  let peopleCount = guestsCount.adults + guestsCount.children   // raggruppo adulti e bambini fino a 12 anni

  function formatGuests(count, singular, plural) {
    // genera una stringa per ogni tipo di ospite
    if (count === 0) return ""
    return count === 1 ? `${singular}` : `${count} ${plural}`
  }

  let peopleString = formatGuests(peopleCount, "1 persona", "persone")
  let infantsString = formatGuests(guestsCount.infants, "1 neonato", "neonati")
  let petsString = formatGuests(guestsCount.pets, "1 animale", "animali")

  // aggiunge una virgola e uno spazio davanti alle stringhe per neonati e animali
  infantsString = infantsString ? `, ${infantsString}` : ""
  petsString = petsString ? `, ${petsString}` : ""

  // composizione della stringa definitiva
  let guestsString = `${peopleString}${infantsString}${petsString}`

  // aggiorna il valore dello store $searchCriteria
  $searchCriteria.setKey("guests", guestsString)

  return guestsString
}
