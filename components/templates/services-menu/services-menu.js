import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './services-menu.html'

export class CdgServicesMenuDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
