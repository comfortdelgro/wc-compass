import {CdgAccordion} from '@comfortdelgro/wc-compass/src/components/accordion/accordion'
import {CdgDocumentComponent} from '../../shared/document-component'

import template from './customization.html'

class CustomAccordion extends CdgAccordion {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('custom-accordion')
  }
}

customElements.define('custom-accordion', CustomAccordion)

export class CdgCustomizationDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
