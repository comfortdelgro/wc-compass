import {CdgDocumentComponent} from '../../shared/document-component'
import template from './nav-rail.html'

export class CdgNavRailDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const sample = this.querySelector('#sample-collapse-menu')
    const openMenuButton = this.querySelector('#openMenuButton')
    openMenuButton.addEventListener('click', () => {
      sample.setAttribute('open', '')
    })
  }
}
