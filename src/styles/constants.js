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
  }
}