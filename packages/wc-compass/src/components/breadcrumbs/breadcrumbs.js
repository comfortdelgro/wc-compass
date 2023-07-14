import {CdgBaseComponent} from '../../shared/base-component'

export class CdgBreadCrumbs extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-breadcrumbs')
  }
}
