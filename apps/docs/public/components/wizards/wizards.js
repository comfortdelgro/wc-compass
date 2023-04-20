import {CdgDocumentComponent} from '../../shared/document-component'
import template from './wizards.html'

export class CdgWizardsDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const wizards = this.querySelector('cdg-wizards')
    wizards.addEventListener('switchStep', (event) => {
      wizards.current = event.detail.index
    })
  }
}
