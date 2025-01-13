// firebase
import { db } from "../firebase/config.js"
import { collection, query, where, getDocs } from "firebase/firestore"

const accomodationsRef = collection(db, "accomodations")

// estrae tutti gli alloggi in base al paese inserito
export async function getAccomodationsByCountry(country) {
  let accomodationsArray = []

  // query che filtra per paese
  const q = query(accomodationsRef, where("country", "==", country))

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