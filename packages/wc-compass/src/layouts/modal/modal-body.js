import {CdgBaseComponent} from '../../shared/base-component'

export class CdgModalBody extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-modal-body')
  }
}
