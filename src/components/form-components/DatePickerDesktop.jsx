import { eachDayOfInterval, format } from 'date-fns'

// Styles
import "../../styles/react-components/DatePickerDesktop.css"

// Costanti
const today = new Date()
const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1)
const dayName = [
  [0, "Domenica"],
  [1, "Lunedì"],
  [2, "Martedì"],
  [3, "Mercoledì"],
  [4, "Giovedì"],
  [5, "Venerdì"],
  [6, "Sabato"],
]

// Funzioni
function generateCalendar(year, month) {
  // genera un calendario, sotto forma di array, di due anni a partire dal mese corrente.
  // ogni elemento dell'array è un oggetto contenente anno, mese, giorno, e nome del giorno
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 23, 0)

  return eachDayOfInterval({ start, end }).map(date => dayToObject(date))
}

function dayToObject(date) {
  // converte una data in un oggetto con il formato: { year: yyyy, month: mm, day: d }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Mesi indicizzati da 0
    day: date.getDate(),
    weekDay: dayName[date.getDay()][1],
  }
}

// getDay()   restituisce il numero del giorno della settimane (es. Venerdì = 5)
// getDate()  restituisce il numero del giorno del mese
// getMonth() restituisce il numero del mese, partendo da 0 (es. Dicembre = 11)

export default function DatePickerDesktop({ fieldId, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }) {

  return (
    <div className="date-picker">
      <h2>Scegli la data di {fieldId == "checkInDate" ? "Check-in" : "Check-out"}</h2>
      <div className="calendar">
        <table>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
