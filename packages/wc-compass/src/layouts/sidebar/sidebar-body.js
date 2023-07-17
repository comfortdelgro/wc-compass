import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSidebarBody extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar-body')
  }
}
