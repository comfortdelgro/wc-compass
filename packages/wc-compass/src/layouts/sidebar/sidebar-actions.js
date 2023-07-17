import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSidebarActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar-actions')
  }
}
