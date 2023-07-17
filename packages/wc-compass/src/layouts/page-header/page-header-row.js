import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPageHeaderRow extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-page-header-row')
  }
}
