import {CdgBaseComponent} from '../../shared/base-component'

export class CdgCardBody extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-card-body')
  }
}
