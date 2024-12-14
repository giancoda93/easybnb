// FUNZIONI

// 1) Funzione per convertire oggetti in stringhe contenenti variabili CSS dimensionali 

export const generateCSSConstants = (obj, unit) => {
  let constantsArr = ""

  // Per ogni coppia chiave/valore viene costruita una stringa sotto forma di costante CSS,
  // la quale viene poi aggiunta ad una stringa che le conterrà tutte
  Object.entries(obj).forEach(entry => {
    let CSSConst = "--" + entry[0] + ": " + entry[1] + unit + "; "
    constantsArr += CSSConst
  })

  return constantsArr
}

// DIMENSIONI

// 1) Form di ricerca sulla homepage

export const searchFormDimensions = {
  spanLineHeight: 16,
  inputLineHeight: 20,
  paddingLabelV: 16,
  paddingLabelH: 24,
  separatorW: 0.84,
  get formBorderRadius() {
    return (this.spanLineHeight + this.inputLineHeight + (this.paddingLabelV * 2)) / 2
  },
  largeFieldW: 282.5,
  get smallFieldW() {
    return (this.largeFieldW / 2)
  },
  get largeFieldTabletW() {
    return (this.largeFieldW - 30)
  },
  get smallFieldTabletW() {
    return (this.smallFieldW - 15)
  },
  get formW() {
    return (this.largeFieldW * 2) + (this.smallFieldW * 2) + (this.separatorW * 3)
  },
  get formTabletW() {
    return (this.largeFieldTabletW * 2) + (this.smallFieldTabletW * 2) + (this.separatorW * 3)
  },
}

export const searchFormFieldsData = [
  {id: "destination", label: "Dove", placeholder: "Cerca destinazioni"},
  {id: "check-in-date", label: "Check-in", placeholder: "Aggiungi date"},
  {id: "check-out-date", label: "Check-out", placeholder: "Aggiungi date"},
  {id: "guests", label: "Chi", placeholder: "Aggiungi ospiti"},
]

export const searchFormPickersDimensions = {
  pickerBorderRadius: 32,
}