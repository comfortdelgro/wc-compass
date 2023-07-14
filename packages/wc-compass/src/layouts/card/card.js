import {CdgBaseComponent} from '../../shared/base-component'

export class CdgCard extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-card')
    // Make card focusable
    if (!this.hasAttribute('disabled')) {
      this.tabIndex = 0
    }
  }
}
