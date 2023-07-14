export class CdgButton extends HTMLButtonElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-button')
    const icon = this.querySelector('cdg-icon')
    if (icon) {
      this.classList.add('has-icon')
    }

    const buttonText =
      this.innerText ||
      this.getAttribute('alt') ||
      this.getAttribute('title') ||
      'Button'

    this.setAttribute('aria-label', buttonText)
  }
}
