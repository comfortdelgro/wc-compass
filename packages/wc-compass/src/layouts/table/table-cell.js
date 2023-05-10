export class CdgTableCell extends HTMLTableCellElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.classList.add('cdg-table-cell')
  }
}
