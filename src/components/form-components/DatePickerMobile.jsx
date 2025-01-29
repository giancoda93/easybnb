// IMPORT

// React
import { useEffect, useState } from "react"

// Stile
import "../../styles/react-components/DatePickerMobile.css"

// Costanti
import { dayName, monthName } from "../../utilities/searchFormFunctions"

// Funzioni
import { dayToObject, generateMonth, getMonthGrid, isDateObjBefore } from '../../utilities/searchFormFunctions'

// Store
import { $searchCriteria } from "../../store/store"
import { useStore } from "@nanostores/react"

// --------------------------------------------------------------------
// FUNZIONI E COSTANTI INTERNE

const today = dayToObject(new Date())

function areObjectsEqual(obj1, obj2) {
  // confronta due oggetti e restituisce "true" se sono identici
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function chooseDayClass(day, dates) {
  // sceglie le classi css da aggiungere al giorno
  let dayString = day == "" ? "" : "day-mobile"
  let dayBeforString = isDateObjBefore(day, today) ? " day-mobile-before" : ""
  let daySelectedString = areObjectsEqual(day, dates[0]) ? " selected" : areObjectsEqual(day, dates[1]) ? " selected" : ""

  return `${dayString}${dayBeforString}${daySelectedString}`
}

function chooseDayContainerClass(day, dates, monthArray, index) {
  // sceglie le classi css da aggiungere al container del giorno per colorare lo sfondo
  let intervalString = ""
  let limitString = ""
  let beforeInterval = ""

  if (dates.length == 2) {
    
    if (isDateObjBefore(day, dates[1])) {
      // determina lo sfondo dei giorni tra la data di check-in e quella di check-out
      if (!isDateObjBefore(day, dates[0])) {
        intervalString = " interval" // giorno compreso tra check-in e check-out
      }
      if (areObjectsEqual(day, dates[0])) {
        intervalString = " interval-first" // giorno di check-in
      }
    } else if (areObjectsEqual(day, dates[1])) {
      intervalString = " interval-last"  // giorno di check-out
    }

    // determina se si tratta della casella prima del primo giorno del mese
    if (monthArray[index + 1] && day == "") {
      if (!isDateObjBefore(monthArray[index + 1], dates[0]) && isDateObjBefore(monthArray[index + 1], dates[1]) && !areObjectsEqual(monthArray[index + 1], dates[0])) {
        beforeInterval = " before-interval"
      }
      if (areObjectsEqual(monthArray[index + 1], dates[1])) {
        beforeInterval = " before-interval"
      }
    }
  }

  // determina lo sfondo del primo e l'ultimo giorno del mese se sono compresi nell'intervallo
  if (monthArray[index - 1] == "" && monthArray[index] != "") {
    limitString = " first-day" // primo giorno del mese
  } else if (monthArray[index + 1] == "" && monthArray[index] != "") {
    limitString = " last-day"  // ultimo giorno del mese
  }

  return `${beforeInterval}${intervalString}${limitString}`
}

// --------------------------------------------------------------------
// HANDLERS

function handleSelectDay (day, dates, setDates) {
  if (day == "") return
  if (isDateObjBefore(day, today)) return

  // Aggiunge le date selezionate allo stato "selectedDates"
  let tempDates = [ ...dates ]

  if (tempDates.length == 0) {
    // se non sono state selezionate date, la aggiungo
    tempDates.push(day)
  } else if (tempDates.length == 1) {
    // se è stata selezionata solo una data verifico se quella nuova è precedente a quella già presente
    // se SI la aggiungo in posizione 0 dell'array, altrimenti in posizione 1
    if (isDateObjBefore(day, tempDates[0])) {
      tempDates.unshift(day)
    } else {
      tempDates.push(day)
    }
  } else if (tempDates.length == 2) {
    // se sono già presenti due date: se il giorno selezionato è precedente a entrambi sostituisco il primo,
    // se è successivo ad entrambi sostituisco il secondo, altrimenti svuoto l'array e inserisco il nuovo giorno
    // come unico elemento
    if (isDateObjBefore(day, tempDates[0])) {
      tempDates.shift()
      tempDates.unshift(day)
    } else if (!isDateObjBefore(day, tempDates[1])) {
      tempDates.pop()
      tempDates.push(day)
    } else {
      tempDates = [day]
    }
  }

  setDates([ ...tempDates ])
}

// --------------------------------------------------------------------
// Funzione componente
export default function DatePickerMobile({ title }) {

  const searchCriteria = useStore($searchCriteria)

  const [showedMonths, setShowedMonths] = useState([ today.month, today.month + 1, today.month + 2, today.month + 3 ])
        // TODO: andrà impostata la possibilità di aumentare i mesi visualizzati
  const [selectedDates, setSelectedDates] = useState([])

  useEffect(() => {
    let string = ""

    if (selectedDates.length > 1) {
      let string1 = `check-in: ${selectedDates[0].day}-${selectedDates[0].month}-${selectedDates[0].year}`
      let string2 = `check-out: ${selectedDates[1].day}-${selectedDates[1].month}-${selectedDates[1].year}`
      string = `${string1},\n${string2}`
    }
    console.log(string)
  }, [selectedDates])

  return (
    <>
      <div className="date-picker-mobile">
        <h2>{title}</h2>
        {/* Nomi giorni della settimana */}
        <div className="weekdays-mobile">
          {dayName.map((day, idx) => {
            if (idx != 0) {
              return <div className="weekday-mobile" key={idx}>{day.slice(0, 3)}</div>
            }
          })}
          <div className="weekday-mobile">{dayName[0].slice(0, 3)}</div>
        </div>
        {/* Calendario */}
        <div className="months-scroll">
          {showedMonths.map((month, idx) => (
            <div className="month-container-mobile" key={idx}>
              <h3 className="month-name-mobile">{monthName[month - 1]}</h3>
              <div className="month-mobile">
                {getMonthGrid(generateMonth(today.year, month)).map((d, idx) => (
                  <div
                    className={`day-mobile-container${chooseDayContainerClass(d, selectedDates, getMonthGrid(generateMonth(today.year, month)), idx)}`}
                    key={idx}
                  >
                    <div 
                      className={chooseDayClass(d, selectedDates)}
                      onClick={() => handleSelectDay(d, selectedDates, setSelectedDates)}
                    >
                      {d ? d.day : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn-add-months"
            onClick={() => setShowedMonths([ ...showedMonths, ((showedMonths[showedMonths.length - 1]) + 1) ])}
          >
            Carica altre date
          </button>
        </div>
      </div>
    </>
  );
}
