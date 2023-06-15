import {CdgCountTextareaSection} from './count/count-textarea.section'
import {CdgDisabledTextareaSection} from './disabled/disabled-textarea.section'
import {CdgTextareaDemo} from './textarea'

customElements.define('cdg-textarea-demo', CdgTextareaDemo)
customElements.define(
  'cdg-disabled-textarea-section',
  CdgDisabledTextareaSection,
)
customElements.define('cdg-count-textarea-section', CdgCountTextareaSection)

export {CdgTextareaDemo, CdgDisabledTextareaSection, CdgCountTextareaSection}
