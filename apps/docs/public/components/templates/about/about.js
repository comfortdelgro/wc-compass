import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './about.html'

export class CdgAboutDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
