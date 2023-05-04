import {CdgDocumentComponent} from '../../shared/document-component'
import template from './z-index.html'

export class CdgZIndexDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
