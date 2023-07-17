import {CdgBaseComponent} from '../../shared/base-component'

export class CdgAccordionContent extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-acordion-content')
  }
}
