import {CdgBaseComponent} from '../../shared/base-component'

export class CdgLinkPagination extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-pagination')
    this.classList.add('cdg-link-pagination')
  }
}
