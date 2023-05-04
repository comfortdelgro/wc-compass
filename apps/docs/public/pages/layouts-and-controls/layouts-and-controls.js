import {CdgDocumentComponent} from '../../shared/document-component'
import template from './layouts-and-controls.html'

export class CdgLayoutsAndControlsDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
