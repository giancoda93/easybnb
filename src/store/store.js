import { atom } from "nanostores"

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
export const $showDialog = atom(true)