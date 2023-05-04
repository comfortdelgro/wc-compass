import {CdgDocumentComponent} from '../../shared/document-component'
import template from './customization.html'

export class CdgCustomizationDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
