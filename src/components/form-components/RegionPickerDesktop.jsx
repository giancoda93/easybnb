// Styles
import "../../styles/react-components/RegionPickerDesktop.css"

// Costanti
const regions = [
  {image: "../../../images/world.jpg", text: "Sono Flessibile"},
  {image: "../../../images/usa.webp", text: "Stati Uniti"},
  {image: "../../../images/spain.webp", text: "Spagna"},
  {image: "../../../images/south-america.webp", text: "America del Sud"},
  {image: "../../../images/uk.webp", text: "Regno Unito"},
  {image: "../../../images/africa.webp", text: "Africa"},
]

// -----------------------------------------------------------------------------------------------------
// Componente region card
function RegionCard({ image, text, setDestination }) {
  return (
    <div className="region-card" onClick={() => setDestination(text)}>
      <img src={image} alt="img" />
      <p>{text}</p>
    </div>
  )
}

// Componente principale region picker
export default function RegionPickerDesktop({ setDestination }) {
  return (
    <div className="region-picker">
      <h2>Cerca per regione</h2>
      <div className="regions-container">
        {regions.map((region) => (
          <RegionCard
            image={region.image}
            text={region.text}
            key={region.image}
            setDestination={setDestination}
          />
        ))}
      </div>
    </div>
  );
}
