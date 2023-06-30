export class CdgAlertBadge extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert-badge')
  }
}
