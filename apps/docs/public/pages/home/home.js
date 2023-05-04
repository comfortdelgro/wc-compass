import {CdgDocumentComponent} from '../../shared/document-component'
import template from './home.html'

export class CdgHomeDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
