import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToastTitle extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast-title')
  }
}
