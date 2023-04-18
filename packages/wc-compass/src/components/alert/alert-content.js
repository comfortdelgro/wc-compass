export class CdgAlertContent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert-content')
  }
}
