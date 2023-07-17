import {CdgBaseComponent} from '../../shared/base-component'

export class CdgCardActivity extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-card-activity')
  }
}
