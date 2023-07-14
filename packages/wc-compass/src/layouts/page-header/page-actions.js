import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPageActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-page-actions')
  }
}
