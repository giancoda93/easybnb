// IMPORT

import { useEffect, useState } from 'react'
// Styles
import "../../styles/react-components/DatePickerDesktop.css"
// Icone
import ChevronLeft from "/chevron-left.svg?url"
import ChevronRight from "/chevron-right.svg?url"
// Costanti esterne
import { dayName, monthName } from '../../utilities/searchFormFunctions'
// Funzioni esterne
import { dayToObject, generateMonth, getMonthGrid, isDateObjBefore } from '../../utilities/searchFormFunctions'

// ------------------------------------------------------------------------------------

// Costanti locali

const today = dayToObject(new Date())

// Funzioni locali

function chooseDayClass(date, today, checkInDate, checkOutDate) {
  // definisce la classe css da assegnare ad ogni elemento "day" del calendario generato
  let classString = "day"
  
  classString += !date ? " day-before" : isDateObjBefore(date, today) ? " day-before" : " day-after"
  classString += `${date.day}-${date.month}-${date.year}` == checkInDate ? " selected check-in" : ""
  classString += `${date.day}-${date.month}-${date.year}` == checkOutDate ? " selected check-out" : ""
  if (checkInDate, checkOutDate) {
    let checkInDateTemp = new Date(checkInDate.split("-")[2], checkInDate.split("-")[1] - 1, checkInDate.split("-")[0])
    let checkInDateObj = dayToObject(checkInDateTemp)
    let checkOutDateTemp = new Date(checkOutDate.split("-")[2], checkOutDate.split("-")[1] - 1, checkOutDate.split("-")[0])
    let checkOutDateObj = dayToObject(checkOutDateTemp)
    if (`${date.day}-${date.month}-${date.year}` != checkInDate) {
      classString += (!isDateObjBefore(date, checkInDateObj) && isDateObjBefore(date, checkOutDateObj)) ? " interval" : ""
    }
  }
  return classString
}

// Funzione principale del componente generato
export default function DatePickerDesktop({ fieldId, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }) {
  const [firstMonth, setFirstMonth] = useState({m: today.month, y: today.year})
  const [secondMonth, setSecondMonth] = useState({m: today.month + 1, y: today.year})
  const [firstMonthCalendar, setFirstMonthCalendar] = useState(generateMonth(firstMonth.y, firstMonth.m))
  const [secondMonthCalendar, setSecondMonthCalendar] = useState(generateMonth(secondMonth.y, secondMonth.m))

  function chooseClickHandler(date, isBefore) {
    if (!isBefore) {
      if (fieldId == "checkInDate") {
        return () => setCheckInDate(`${date.day}-${date.month}-${date.year}`)
      }
      if (fieldId == "checkOutDate") {
        return () => setCheckOutDate(`${date.day}-${date.month}-${date.year}`)
      }
    }
  }

  // Passa al mese successivo
  function nextMonth() {
    setFirstMonth( prev => {
      let next = {m: prev.m + 1, y: prev.y}
      return next
    })
    setSecondMonth( prev => {
      let next = {m: prev.m + 1, y: prev.y}
      return next
    })
  }

  // Torna al mese precedente, a meno che non sia il mese corrente
  function prevMonth() {
    if (today.month == firstMonth.m) {
      return
    }
    setFirstMonth( prev => {
      let next = {m: prev.m - 1, y: prev.y}
      return next
    })
    setSecondMonth( prev => {
      let next = {m: prev.m - 1, y: prev.y}
      return next
    })
  }

  useEffect(() => {
    // Quando cambia il mese selezionato viene rigenerata la griglia dei giorni
    setFirstMonthCalendar(() => generateMonth(firstMonth.y, firstMonth.m))
    setSecondMonthCalendar(() => generateMonth(secondMonth.y, secondMonth.m))
  }, [firstMonth, secondMonth, checkInDate, checkOutDate])

  // componente generato
  return (
    <div className="date-picker">
      <h2>Scegli la data di {fieldId == "checkInDate" ? "Check-in" : "Check-out"}</h2>
      <div className="calendar">
        {/* Freccia per mese precedente */}
        <div 
          className={`arrow ${today.month == firstMonth.m ? "disabled" : "active"}`}
          onClick={() => prevMonth()}
        >
          <img src={ChevronLeft} alt="previous month" />
        </div>
        {/* Contenitore primo mese */}
        <div className="month-container">
          <div className="month-header">
            <h3>{monthName[firstMonth.m - 1]}</h3>
            <div className="weekdays">
              {dayName.map( day => {
                if (day[0] != 0) {
                  return <div className="weekday" key={day[0]}>{day[1].slice(0, 3)}</div>
                }
              })}
              <div className="weekday">{dayName[0][1].slice(0, 3)}</div>
            </div>
          </div>
          <div id='first-month' className='month'>
            {getMonthGrid(firstMonthCalendar).map((d, idx) => (
              <div 
                key={idx} 
                className={chooseDayClass(d, today, checkInDate, checkOutDate)}
                onClick={chooseClickHandler(d, isDateObjBefore(d, today))}
              >
                {d ? d.day : ""}
              </div>
            ))}
          </div>
        </div>
        {/* Contenitore secondo mese */}
        <div className="month-container">
          <div className="month-header">
            <h3>{monthName[secondMonth.m - 1]}</h3>
            <div className="weekdays">
              {dayName.map( day => {
                if (day[0] != 0) {
                  return <div className="weekday" key={day[0]}>{day[1].slice(0, 3)}</div>
                }
              })}
              <div className="weekday">{dayName[0][1].slice(0, 3)}</div>
            </div>
          </div>
          <div id='second-month' className='month'>
            {getMonthGrid(secondMonthCalendar).map((d, idx) => (
              <div 
                key={idx} 
                className={chooseDayClass(d, today, checkInDate, checkOutDate)}
                onClick={chooseClickHandler(d, isDateObjBefore(d, today))}
              >
                {d ? d.day : ""}
              </div>
            ))}
          </div>
        </div>
        {/* Freccia per mese successivo */}
        <div 
          className='arrow active'
          onClick={() => nextMonth()}
        >
          <img src={ChevronRight} alt="next month" />
        </div>
      </div>
    </div>
  );
}
