// Styles
import "../styles/react-components/SearchForm.css"

// Icons


// Constants
export const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "check-in-date", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "check-out-date", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

function TextInput({ label, placeholder }) {
  return (
    <label className="text-input">
      <span className="text-input-label">{label}</span>
      <input className="text-input-field" type="text" placeholder={placeholder} />
    </label>
  )
}

export default function SearchForm() {
  return (
    <form>
      {searchFormFieldsData.map((fieldData, idx) => (
        <>
          <div className="field-container">
            <div
              id={fieldData.id}
              className={`field field-hover ${fieldData.id.includes("date") ? "small-field" : "large-field"}`}
            >
              <TextInput label={fieldData.label} placeholder={fieldData.placeholder} />

            </div>
          </div>
        </>
      ))}
    </form>
  );
}
