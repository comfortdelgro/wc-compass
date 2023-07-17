import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSubNav extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sub-nav')
  }
}
