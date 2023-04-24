import {CdgDocumentComponent} from '../../shared/document-component'
import template from './file.html'

export class CdgFileDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }
}
