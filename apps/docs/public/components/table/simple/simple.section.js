import {CdgBaseComponent} from '../../../shared/base-component'
import template from './simple.section.html'
import {dummyData} from '../table-data'

export class CdgTableSimpleSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const table = this.querySelector('#sampleSimpleTable')
    table.data = dummyData.slice(0, 10)
  }
}
