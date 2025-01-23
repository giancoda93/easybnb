import { atom, map } from "nanostores"

// ---------------
// Qui vengono gestite le variabili (o stati) globali e accessibili da tutti i componenti
// ---------------

// Criteri di ricerca degli alloggi, definiti con i form di ricerca principali
export const $searchCriteria = atom({
  destination: "",
  checkInDate: "",
  checkOutDate: "",
  guests: "",
})

// Variabile che definisce la visibilità o meno del dialog form per mobile
export const $showDialog = atom(true) // TODO: lasciato "true" per lavorare ma deve essere "false" di default

// Variabile che tiene traccia dell'espansione o meno dei mobile picker,
// quando un mobile picker è aperto gli altri devono essere chiusi
export const $mobilePickersCollapsed = map({
  // di default devono essere tutti "true" perché i picker sono collassati
  destination: true,
  dates: true,
  guests: true,
})