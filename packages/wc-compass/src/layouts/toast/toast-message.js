import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToastMessage extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast-message')
  }
}
