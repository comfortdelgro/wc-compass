import {CdgBaseComponent} from '../../shared/base-component'

export class CdgAlertContent extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert-content')
  }
}
