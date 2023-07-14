import {CdgBaseComponent} from '../../shared/base-component'

export class CdgCardActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-card-actions')
  }
}
