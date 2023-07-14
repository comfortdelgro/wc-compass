import {CdgBaseComponent} from '../../shared/base-component'

export class CdgToast extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toast')
  }
}
