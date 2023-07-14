import {CdgButtonBaseComponent} from '../../shared/base-component'

export class CdgButton extends CdgButtonBaseComponent {
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
