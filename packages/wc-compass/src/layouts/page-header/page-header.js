import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPageHeader extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-page-header')
  }
}
