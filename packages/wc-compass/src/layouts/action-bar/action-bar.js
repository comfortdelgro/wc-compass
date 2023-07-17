import {CdgBaseComponent} from '../../shared/base-component'

export class CdgActionBar extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-toolbar')
  }
}
