export class CdgTableCell extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.classList.add('cdg-table-cell')
  }
}
