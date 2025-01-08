// IMPORT
import { eachDayOfInterval, isBefore } from 'date-fns'
import { Country, City } from "country-state-city";

// -----------------------------------------------------------------------------------------------------------------
// COSTANTI

// dati per costruire i campi del form
export const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "checkInDate", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "checkOutDate", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

// valore di default degli stati dei componenti del form
export const fieldInitialState = {
  hover: true,
  isActive: true,
  isFocused: false,
}

// conversione da numero a nome del giorno della settimana
export const dayName = [
  [0, "Domenica"],
  [1, "Lunedì"],
  [2, "Martedì"],
  [3, "Mercoledì"],
  [4, "Giovedì"],
  [5, "Venerdì"],
  [6, "Sabato"],
]

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

// -----------------------------------------------------------------------------------------------------------------
// HANDLERS

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

export const submitHandler = (e, destination, checkInDate, checkOutDate, guests) => {
  e.preventDefault()
  console.log(destination, checkInDate, checkOutDate, guests)
}

// -----------------------------------------------------------------------------------------------------------------
// FUNZIONI

// sceglie quale funzione click handler assegnare ad ogni campo del form
export const chooseChangeHandler = (fieldId, setDestination, setCheckInDate, setCheckOutDate, setGuests) => {
  switch (fieldId) {
    case searchFormFieldsData[0].id:
      return (e) => setDestination(e.target.value)
    case searchFormFieldsData[1].id:
      return (e) => setCheckInDate(e.target.value)
    case searchFormFieldsData[2].id:
      return (e) => setCheckOutDate(e.target.value)
    case searchFormFieldsData[3].id:
      return (e) => setGuests(e.target.value)
    default:
      return (e) => console.log("Change handler non definito")
  }
}

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

// sceglie quale stato associare ad un campo input
export const chooseValue = (fieldId, destination, checkInDate, checkOutDate, guests) => {
  switch (fieldId) {
    case "destination":
      return destination
    case "checkInDate":
      return checkInDate
    case "checkOutDate" :
      return checkOutDate
    case "guests":
      return guests
    default:
      return null
  }
}

// sceglie quale funzione "setState" associare ad un campo input
export const chooseSetValue = (fieldId, setDestination, setCheckInDate, setCheckOutDate, setGuests) => {
  switch (fieldId) {
    case "destination":
      return setDestination
    case "checkInDate":
      return setCheckInDate
    case "checkOutDate" :
      return setCheckOutDate
    case "guests":
      return setGuests
    default:
      return null
  }
}

// converte una data in un oggetto con il formato: { year: yyyy, month: mm, day: d }
export function dayToObject(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Mesi indicizzati da 0
    day: date.getDate(),
    weekDay: {
      name: dayName[date.getDay()][1],
      num: date.getDay(),
    }
  }
}

// genera un calendario, sotto forma di array, di due anni a partire dal mese corrente.
// ogni elemento dell'array è un oggetto contenente anno, mese, giorno, e nome del giorno
export function generateMonth(year, month) {
  const start = new Date(year, month - 1, 1)
  const end = new Date(year, month, 0)

  return eachDayOfInterval({ start, end }).map(date => dayToObject(date))
}

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

// converte gli oggetti data custom in date classiche e li confronta
// restituendo true se il primo argomento data è precedente al
// secondo argomento data
export function isDateObjBefore(dateObj1, dateObj2) {
  const date1 = new Date(dateObj1.year, dateObj1.month - 1, dateObj1.day)
  const date2 = new Date(dateObj2.year, dateObj2.month - 1, dateObj2.day)

  return isBefore(date1, date2)
}

// converte una stringa composta da DD/MM/YYYY in una data JavaScript 
// (non è necessario che siano due cifre per giorni e mesi)
export function stringToDate(string) {
  const dateArray = string.split("-")

  return new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
}


// filtra le città mostrate nella ricerca in base alla stringa inserita nell'input
export function filteredCities(input) {
  const matchedCities = City.getAllCities().filter(city => {
    if (city.name.slice(0, input.length).toLowerCase() == input.toLowerCase()) {
      return city
    }
  })
  return matchedCities.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 10)
}
