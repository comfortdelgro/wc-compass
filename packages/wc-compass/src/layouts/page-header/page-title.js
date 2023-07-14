import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPageTitle extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-page-title')
  }
}
