import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToastTime extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast-time')
  }
}
