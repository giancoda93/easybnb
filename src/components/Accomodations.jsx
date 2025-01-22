// -------------------------------------------------------------------------------
// IMPORT

// Stile
import "../styles/react-components/Accomodations.css";

// Componenti
import AccomodationCard from "./AccomodationCard.jsx";

// import database
import { getAllAccomodations } from "../db/dbAccomodations";

// Store
import { $searchCriteria, $showDialog } from "../store/store";
import { useStore } from "@nanostores/react";

// React
import { useEffect, useState } from "react";

// FUNZIONI
function average(array) {
  let sum = 0;
  array.forEach((e) => {
    sum += e;
  });
  return (sum / array.length).toFixed(1);
}

// COSTANTI
const accomodations = await getAllAccomodations();

// -------------------------------------------------------------------------------
// Funzione componente
export default function Accomodations() {
  // Stati
  const [filteredAccomodations, setFilteredAccomodations] = useState([ ...accomodations ])

  // Store
  const searchCriteria = useStore($searchCriteria)
  const showDialog = useStore($showDialog)  // serve per nascondere gli alloggi quando è aperto il form dialog per mobile

  useEffect(() => {
    // TODO: Per ora si può filtrare solo con il nome della città
    const filtered = accomodations.filter((item) => {
      return (searchCriteria.destination ? item.city.toLowerCase().includes(searchCriteria.destination.toLowerCase()) : true)
    })
    
    setFilteredAccomodations(filtered)

  }, [searchCriteria])

  return (
    <div id="accomodations" className={`${showDialog ? "accomodations-hidden" : ""}`}>
      {filteredAccomodations &&
        filteredAccomodations.map((acc) => (
          <a href={`/accomodations/${acc.id}`} className="accomodation-link" key={acc.id}>
            <AccomodationCard
              image={`/accomodations/${acc.images[0]}`}
              name={acc.name}
              rating={average(acc.ratings)}
              price={acc.pricePerNight}
              city={acc.city}
              country={acc.country}
            />
          </a>
        ))}
    </div>
  );
}
