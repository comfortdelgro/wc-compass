import {CdgBaseDocsComponent} from '../../../shared/base-component'

import {REGEX_SPACE} from '@comfortdelgro/wc-compass/src/shared/regex'

import template from './utility.section.html'

export class CdgUtilitySection extends CdgBaseDocsComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const test = this.querySelector('#test')
    const result = this.querySelector('#result')
    result.textContent = test.textContent.replace(REGEX_SPACE, '')
  }
}
