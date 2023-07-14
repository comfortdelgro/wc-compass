import {CdgBaseComponent} from '../../shared/base-component'

export class CdgAlert extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert')
  }
}
