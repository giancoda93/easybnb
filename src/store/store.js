// IMPORT

import { atom, map, onSet } from "nanostores"
import { getAllAccomodations } from "../db/dbAccomodations"

// COSTANTI
const allAccomodations = await getAllAccomodations()

// ---------------
// Qui vengono gestite le variabili (o stati) globali e accessibili da tutti i componenti
// ---------------

// Criteri di ricerca degli alloggi, definiti con i form di ricerca principali
export const $searchCriteria = map({
  destination: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
})

// Variabile che definisce la visibilità o meno del dialog form per mobile
export const $showDialog = atom(false) // TODO: lasciato "true" per lavorare ma deve essere "false" di default

// Variabile che tiene traccia dell'espansione o meno dei mobile picker,
// quando un mobile picker è aperto gli altri devono essere chiusi
export const $mobilePickersCollapsed = map({
  // di default devono essere tutti "true" perché i picker sono collassati
  destination: true,
  dates: true,
  guests: true,
})

// Tipo di ospiti
export const $guestsCount = map({
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
})

// Elenco alloggi disponibili, varia in base ai criteri di ricerca
export const $accomodations = atom([ ...allAccomodations.response ])

// ---------------------------------------------------
// Errori
// ---------------------------------------------------
export const $dbError = atom(allAccomodations.error)


// ---------------------------------------------------
// Eventi store
// ---------------------------------------------------
onSet($searchCriteria, ({ newValue }) => {
  if (newValue.guests == "") {
    if ($guestsCount.get().adults != 0) $guestsCount.setKey("adults", 0)
    if ($guestsCount.get().children != 0) $guestsCount.setKey("children", 0)
    if ($guestsCount.get().infants != 0) $guestsCount.setKey("infants", 0)
    if ($guestsCount.get().pets != 0) $guestsCount.setKey("pets", 0)
  }
})