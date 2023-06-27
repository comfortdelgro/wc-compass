import {CdgBaseComponent} from '../../../shared/base-component'
import template from './field-validation.section.html'

export class CdgFieldValidationSection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }
}
