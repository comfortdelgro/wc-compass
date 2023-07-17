import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToastHeader extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast-header')
  }
}
