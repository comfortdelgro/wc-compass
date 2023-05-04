import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './services.html'

export class CdgServiceDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
