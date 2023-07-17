import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToastTopActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast-top-actions')
  }
}
