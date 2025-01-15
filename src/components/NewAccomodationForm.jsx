// IMPORT
// React
import { useEffect, useState } from "react"

// Componenti
import NewAccomodationTextInput from "./new-accomodation-form/NewAccomodationTextInput"

// Stile
import "../styles/react-components/NewAccomodationForm.css"

// COSTANTI
// Elenco campi form
const formFields = [
  { id: 1, dbName: "city", text: "Città", dataType: "string" },
  { id: 2, dbName: "country", text: "Stato", dataType: "string" },
  { id: 3, dbName: "images", text: "Immagini", dataType: "array" },
  { id: 4, dbName: "name", text: "Nome", dataType: "string" },
  { id: 5, dbName: "pricePerNight", text: "Prezzo a notte", dataType: "number" },
  { id: 6, dbName: "ratings", text: "Valutazioni", dataType: "array" },
]

// ----------------------------------------------------------------------------
// Funzione componente
export default function NewAccomodationForm() {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [images, setImages] = useState([])
  const [name, setName] = useState("")
  const [pricePerNight, setPricePerNight] = useState("")
  const [ratings, setRatings] = useState([])


  // **********
  // TODO: non capisco perchè non funziona il form: ricarica la pagina con il submit e sembra che gli stati non si aggiornino quando cambia il valore dell'input
  // **********

  // Funzioni interne
  function chooseState(dbName) {
    // assegna lo stato corrispondente all'input del form
    if(dbName === "city") return city
    if(dbName === "country") return country
    if(dbName === "images") return images
    if(dbName === "name") return name
    if(dbName === "pricePerNight") return pricePerNight
    if(dbName === "ratings") return ratings
  }

  function chooseSetState(dbName) {
    // assegna il setState corrispondente all'input del form
    if(dbName === "city") return setCity
    if(dbName === "country") return setCountry
    if(dbName === "images") return setImages
    if(dbName === "name") return setName
    if(dbName === "pricePerNight") return setPricePerNight
    if(dbName === "ratings") return setRatings
  }

  // Handlers
  function submitHandler(e) {
    e.preventDefault()
    // TODO: finire la funzione
  }

  return (
    <>
      <h1 className="form-title">Nuovo Alloggio</h1>
      <form id="new-accomodation" onSubmit={(e) => submitHandler(e)}>
        {formFields.map( field => (
          <NewAccomodationTextInput
            key={field.id}
            label={field.text}
            dataType={field.dataType}
            state={chooseState(field.dbName)}
            setState={chooseSetState(field.dbName)}
          />
        ))}
        <div className="accomodation-form-buttons">
          <button className="btn-accomodation cancel" type="reset">Cancella</button>
          <button className="btn-accomodation submit" type="submit">Aggiungi</button>
        </div>
      </form>
    </>
  )
}
