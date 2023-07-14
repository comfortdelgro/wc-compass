import {CdgBaseComponent} from '../../shared/base-component'

export class CdgPillBadge extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-pill-badge')
  }
}
