import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './dashboard.html'

export class CdgDashboardDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }
}
