import { eachDayOfInterval, format } from 'date-fns'
import { useEffect, useState } from 'react'

// Styles
import "../../styles/react-components/DatePickerDesktop.css"

// Costanti
const dayName = [
  [0, "Domenica"],
  [1, "Lunedì"],
  [2, "Martedì"],
  [3, "Mercoledì"],
  [4, "Giovedì"],
  [5, "Venerdì"],
  [6, "Sabato"],
]
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



export default function DatePickerDesktop({ fieldId, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }) {
  const [firstMonth, setFirstMonth] = useState({m: today.month, y: today.year})
  const [secondMonth, setSecondMonth] = useState({m: today.month + 1, y: today.year})
  const [firstMonthCalendar, setFirstMonthCalendar] = useState(generateMonth(firstMonth.y, firstMonth.m))
  const [secondMonthCalendar, setSecondMonthCalendar] = useState(generateMonth(secondMonth.y, secondMonth.m))

  useEffect(() => {
    const show = getMonthGrid(firstMonthCalendar)    
    console.log(show)
  }, [firstMonthCalendar])

  return (
    <div className="date-picker">
      <h2>Scegli la data di {fieldId == "checkInDate" ? "Check-in" : "Check-out"}</h2>
      <div className="calendar">
        <div id='first-month' className='month'>
          {getMonthGrid(firstMonthCalendar).map((d, idx) => (
            <div key={idx} className="day">
              {d ? d.day : ""}
            </div>
          ))}
        </div>
        <div id='second-month' className='month'>
          {getMonthGrid(secondMonthCalendar).map((d, idx) => (
            <div key={idx} className="day">
              {d ? d.day : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
