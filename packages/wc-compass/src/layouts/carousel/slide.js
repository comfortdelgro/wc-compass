import {CdgBaseComponent} from '../../shared/base-component'

export class CdgSlide extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-slide')
  }
}
