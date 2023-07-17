import {CdgBaseComponent} from '../../shared/base-component'

export class CdgStatus extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-status')
  }
}
