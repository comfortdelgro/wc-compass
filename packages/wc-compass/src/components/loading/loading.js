import {CdgBaseComponent} from '../../shared/base-component'

export class CdgLoading extends CdgBaseComponent {
  get text() {
    return this.getAttribute('text')
  }

  set text(text) {
    return this.setAttribute('text', text)
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-loading')
    if (this.text) {
      const text = document.createElement('div')
      text.classList.add('spinner-text')
      text.textContent = this.text
      this.appendChild(text)
    }
  }
}
