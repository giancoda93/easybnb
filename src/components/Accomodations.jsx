// -------------------------------------------------------------------------------
// IMPORT

// Stile
import "../styles/react-components/Accomodations.css";

// Componenti
import AccomodationCard from "./AccomodationCard.jsx";

// Store
import { $searchCriteria, $showDialog, $accomodations, $dbError } from "../store/store";
import { useStore } from "@nanostores/react";

// FUNZIONI
function average(array) {
  let sum = 0;
  array.forEach((e) => {
    sum += e;
  });
  return (sum / array.length).toFixed(1);
}

// -------------------------------------------------------------------------------
// Funzione componente
export default function Accomodations() {

  // Store
  const searchCriteria = useStore($searchCriteria)
  const showDialog = useStore($showDialog)  // serve per nascondere gli alloggi quando è aperto il form dialog per mobile
  const accomodations = useStore($accomodations)
  const dbError = useStore($dbError)

  // useEffect(() => {
  //   // TODO: Per ora si può filtrare solo con il nome della città
  //   const filtered = accomodations.filter((item) => {
  //     return (searchCriteria.destination ? item.city.toLowerCase().includes(searchCriteria.destination.toLowerCase()) : true)
  //   })
    
  //   setFilteredAccomodations(filtered)

  // }, [])

  return (
    <>
      {!dbError &&
        <div id="accomodations" className={`${showDialog ? "accomodations-hidden" : ""}`}>
          {accomodations.map((acc) => (
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
      }

      {dbError && (
        <div className="error-message">
          <span>{dbError.message}</span>
        </div>
      )}
    </>
  );
}
