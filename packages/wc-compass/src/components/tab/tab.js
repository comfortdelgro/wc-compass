import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTab extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-tab')
    if (!this.hasAttribute('disabled')) {
      this.tabIndex = 0
    }
    this.addEventListener('keypress', this.handleKeyPress.bind(this))
  }

  handleKeyPress(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      this.dispatchEvent(new MouseEvent('click'))
    }
  }
}
