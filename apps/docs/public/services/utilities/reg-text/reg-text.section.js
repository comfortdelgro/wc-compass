import {CdgBaseDocsComponent} from '../../../shared/base-component'

import {REGEX_TEXT} from '@comfortdelgro/wc-compass/src/shared/regex'

import template from './reg-text.section.html'

export class CdgRegTextSection extends CdgBaseDocsComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const test = this.querySelector('#test')
    const result = this.querySelector('#result')
    result.textContent = test.textContent.replace(REGEX_TEXT, '')
  }
}
