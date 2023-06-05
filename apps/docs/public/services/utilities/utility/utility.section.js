import {CdgBaseComponent} from '../../../shared/base-component'
import template from './utility.section.html'

export class CdgUtilitySection extends CdgBaseComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {}
}
