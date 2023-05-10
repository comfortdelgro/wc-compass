import {CdgDocumentComponent} from '../../shared/document-component'
import template from './checkboxes.html'

export class CdgChexboxesDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const checkbox1 = this.querySelector('#indeterminate')
    checkbox1.setAttribute('indeterminate', '')

    const checkbox2 = (this.querySelector(
      '#roundedIndeterminate',
    ).indeterminate = true)
    checkbox2.setAttribute('indeterminate', '')

    const checkbox3 = (this.querySelector(
      '#disabledIndeterminate',
    ).indeterminate = true)
    checkbox3.setAttribute('indeterminate', '')

    const checkbox4 = (this.querySelector(
      '#roundedDisabledIndeterminate',
    ).indeterminate = true)
    checkbox4.setAttribute('indeterminate', '')
  }
}
