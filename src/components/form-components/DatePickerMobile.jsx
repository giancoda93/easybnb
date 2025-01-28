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

// --------------------------------------------------------------------
// Funzione componente
export default function DatePickerMobile({ title }) {

  const searchCriteria = useStore($searchCriteria)

  const [firstMonthCalendar, setFirstMonthCalendar] = useState(generateMonth(today.year, today.month))
  const [showedMonths, setShowedMonths] = useState([ today.month, today.month + 1, today.month + 2, today.month + 3 ])

  useEffect(() => {

  }, [])

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
                      className="day-mobile"
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
