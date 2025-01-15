// IMPORT

// React
import { useEffect, useState } from "react"

// Componenti
import NewAccomodationTextInput from "./new-accomodation-form/NewAccomodationTextInput"

// Stile
import "../styles/react-components/NewAccomodationForm.css"

// Database
import { addAccomodation } from "../db/dbAccomodations"

// Moduli
import { Country } from "country-state-city"

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

// FUNZIONI
function getCountryIsoCode(country) {
  const countryIsoCode = Country.getAllCountries().find(c => c.name === country).isoCode  
  return countryIsoCode
}

// ----------------------------------------------------------------------------
// Funzione componente
export default function NewAccomodationForm() {
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [images, setImages] = useState([])
  const [name, setName] = useState("")
  const [pricePerNight, setPricePerNight] = useState("")
  const [ratings, setRatings] = useState([])


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

  function deleteFields() {
    // cancella tutti gli input inseriti nei campi
    setCity("")
    setCountry("")
    setImages([])
    setName("")
    setPricePerNight("")
    setRatings([])
  }

  // Handlers

  function submitHandler(e) {
    // gestisce l'invio degli input generando un oggetto che verrà caricato sul database
    e.preventDefault()
    
    const newAccomodation = {
      city,
      country,
      images,
      name,
      pricePerNight: parseInt(pricePerNight),
      ratings,
      countryCode: getCountryIsoCode(country),
    }

    console.log(newAccomodation)
    addAccomodation(newAccomodation)

    // deleteFields()
  }

  // ***************************
  // TODO: sarebbe comodo aggiungere un controllo per la digitazione delle città e degli stati
  // verificandone l'esistenza tramite il pacchetto city-country-state. Magari aggiungendo anche
  // un auto completamento, dei suggerimenti oppure una vera e propria lista dei risultati compatibili
  // con la stringa di input inserita
  // ***************************

  return (
    <>
      <h1 className="form-title">Nuovo Alloggio</h1>
      <form id="new-accomodation" onSubmit={(e) => submitHandler(e)}>
        {formFields.map( field => (
          <NewAccomodationTextInput
            key={field.id}
            dbName={field.dbName}
            label={field.text}
            dataType={field.dataType}
            state={chooseState(field.dbName)}
            setState={chooseSetState(field.dbName)}
          />
        ))}
        <div className="accomodation-form-buttons">
          <button className="btn-accomodation cancel" type="button" onClick={() => deleteFields()}>Cancella</button>
          <button className="btn-accomodation submit" type="submit">Aggiungi</button>
        </div>
      </form>
    </>
  )
}
