// Styles
import "../../styles/react-components/DatePickerDesktop.css"

// Costanti
const today = new Date()

// getDay()   restituisce il numero del giorno della settimane (es. Venerdì = 5)
// getDate()  restituisce il numero del giorno del mese
// getMonth() restituisce il numero del mese, partendo da 0 (es. Dicembre = 11)

export default function DatePickerDesktop({ fieldId, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }) {
  return (
    <div className="date-picker">
      <h2>Scegli la data di {fieldId == "checkInDate" ? "Check-in" : "Check-out"}</h2>
      <p>{today.getMonth()}</p>
    </div>
  );
}
