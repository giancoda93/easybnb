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

// HANDLERS

function handleClick (day, dates, setDates) {
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
  } else if(tempDates.length == 2) {
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
    console.log(selectedDates)
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
                  <div className="day-mobile-container" key={idx}>
                    <div 
                      className={`day-mobile ${isDateObjBefore(d, today) ? "day-mobile-before" : ""}`}
                      onClick={() => handleClick(d, selectedDates, setSelectedDates)}
                    >
                      {d ? d.day : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
