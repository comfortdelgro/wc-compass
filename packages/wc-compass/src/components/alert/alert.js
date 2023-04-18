export class CdgAlert extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert')
  }
}
