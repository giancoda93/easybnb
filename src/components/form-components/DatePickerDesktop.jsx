import { eachDayOfInterval, format, isBefore } from 'date-fns'
import { useEffect, useState } from 'react'

// Styles
import "../../styles/react-components/DatePickerDesktop.css"

// Icone
import ChevronLeft from "/chevron-left.svg?url"
import ChevronRight from "/chevron-right.svg?url"

// Costanti
import { dayName, monthName } from '../../utilities/searchFormFunctions'
const today = dayToObject(new Date())

// Funzioni
function generateMonth(year, month) {
  // genera un calendario, sotto forma di array, di due anni a partire dal mese corrente.
  // ogni elemento dell'array è un oggetto contenente anno, mese, giorno, e nome del giorno
  const start = new Date(year, month - 1, 1)
  const end = new Date(year, month, 0)

  return eachDayOfInterval({ start, end }).map(date => dayToObject(date))
}

function dayToObject(date) {
  // converte una data in un oggetto con il formato: { year: yyyy, month: mm, day: d }
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

function getMonthGrid(month) {
  // restituisce un array di 42 elementi posizionando i giorni del mese
  // in base al giorno della settimana
  const monthGrid = [...month]
  
  const firstDay = month[0].weekDay.num
  const lastDay = month[month.length - 1].weekDay.num
  const numDaysBefore = firstDay == 0 ? 6 : (firstDay - 1)
  const numDaysAfter = lastDay == 0 ? 0 : (7 - lastDay)

  for(let i = 0; i < numDaysBefore; i++) monthGrid.unshift("")
  for(let i = 0; i < numDaysAfter; i++) monthGrid.push("")

  return monthGrid
}

function isDateObjBefore(dateObj1, dateObj2) {
  // converte gli oggetti data custom in date classiche e li confronta
  // restituendo true se il primo argomento data è precedente al
  // secondo argomento data
  const date1 = new Date(dateObj1.year, dateObj1.month - 1, dateObj1.day)
  const date2 = new Date(dateObj2.year, dateObj2.month - 1, dateObj2.day)

  return isBefore(date1, date2)
}

function chooseDayClass(date, today, checkInDate, checkOutDate) {
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
