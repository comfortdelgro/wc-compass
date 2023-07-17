import {CdgBaseComponent} from '../../shared/base-component'

export class CdgModalActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-modal-actions')
  }
}
