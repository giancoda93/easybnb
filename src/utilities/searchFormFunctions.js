// COSTANTI

// dati per costruire i campi del form
export const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "checkInDate", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "checkOutDate", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

// valore di default degli stati dei componenti del form
export const fieldInitialState = {
  hover: true,
  isActive: true,
  isFocused: false,
}

// HANDLERS

// gestisce le classi di stile per i componenti del form quando un input è in focus
export const fieldFocusHandler = (targetId, setFields, setButton, setForm, setPickers) => {  
  setButton(true)
  setForm(false)

  setFields((prevState) => {
    let updatedState = { ...prevState }

    searchFormFieldsData.forEach(f => {
      if (targetId === f.id) {
        updatedState[f.id] = {
          hover: false,
          isActive: true,
          isFocused: true,
        }
      } else {
        updatedState[f.id] = {
          hover: true,
          isActive: false,
          isFocused: false,
        }
      }
    })

    return updatedState
  })

  setPickers((prevState) => {
    let updatedState = { ...prevState }

    searchFormFieldsData.forEach(f => {
      if (targetId === f.id) {
        updatedState[f.id] = true
      } else {
        updatedState[f.id] = false
      }
    })

    return updatedState
  })
}

export const submitHandler = (e, destination, checkInDate, checkOutDate, guests) => {
  e.preventDefault()
  console.log(destination, checkInDate, checkOutDate, guests)
}

// FUNZIONI

// sceglie quale funzione click handler assegnare ad ogni campo del form
export const chooseChangeHandler = (fieldId, setDestination, setCheckInDate, setCheckOutDate, setGuests) => {
  switch (fieldId) {
    case searchFormFieldsData[0].id:
      return (e) => setDestination(e.target.value)
    case searchFormFieldsData[1].id:
      return (e) => setCheckInDate(e.target.value)
    case searchFormFieldsData[2].id:
      return (e) => setCheckOutDate(e.target.value)
    case searchFormFieldsData[3].id:
      return (e) => setGuests(e.target.value)
    default:
      return (e) => console.log("Change handler non definito")
  }
}