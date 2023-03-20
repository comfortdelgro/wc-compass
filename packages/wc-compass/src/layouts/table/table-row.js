export class CdgTableRow extends HTMLElement {
  constructor() {
    super()
    this.setAttribute('role', 'tr')
  }
  connectedCallback() {
    this.classList.add('cdg-table-row')
  }
}
