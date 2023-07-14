import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSubHeader extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-sub-header')
  }
}
