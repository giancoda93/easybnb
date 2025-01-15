// firebase
import { db } from "../firebase/config.js"
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore"

const accomodationsRef = collection(db, "accomodations")

// ---------------------------------------------------------------------
// RECUPERO DOCUMENTI DAL DATABASE

// estrae tutti gli alloggi in base alla query inserita
export async function getAccomodations(objQuery) {
  let accomodationsArray = []
  let q = accomodationsRef

  // definisco il tipo di query
  if (objQuery) {
    if (objQuery.type == "country") {
      q = query(accomodationsRef, where("country", "==", objQuery.value))
    } 
  }

  // snapshot per la query inserita
  const querySnapshot = await getDocs(q)

  // costruisce l'array risultante
  querySnapshot.forEach((doc) => {
    accomodationsArray.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return accomodationsArray
}

// estrae tutti gli alloggi
export async function getAllAccomodations() {
  let response = null

  try {
    response = await getAccomodations()
  } catch (err) {
    console.error("Errore nel caricamento dei document", err)
    response = "Not found"
  }

  return response
}

// estrae gli alloggi disponibili in base al paese
export async function getAccomodationsByCountry(country) {
  let response = null

  try {
    response = await getAccomodations({ type: "country", value: country})
  } catch (err) {
    console.error("Errore nel caricamento dei documenti", err)
    response = "Not found"
  }

  return response
}

// ---------------------------------------------------------------------
// AGGIUNTA DOCUMENTI AL DATABASE

// aggiunge un documento al database
export async function addAccomodation(accomodation) {
  const newDoc = { ...accomodation, timestamp: serverTimestamp() }

  const newDocRef = doc(accomodationsRef)

  try {
    setDoc(newDocRef, newDoc)
  } catch (err) {
    console.error("Errore nel caricamento del documento: ", err)
  }
}