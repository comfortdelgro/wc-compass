export class CdgCheckbox extends HTMLLabelElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('cdg-checkbox')
    this.classList.add('cdg-checkbox')
  }
}
