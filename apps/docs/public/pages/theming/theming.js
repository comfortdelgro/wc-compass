import {CdgDocumentComponent} from '../../shared/document-component'
import template from './theming.html'

export class CdgThemingDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
