import {CdgAccordionDefaultSection} from './default/default.section'
import {CdgAccordionExpandedSection} from './expanded/expanded.section'

customElements.define(
  'cdg-accordion-default-section',
  CdgAccordionDefaultSection,
)

customElements.define(
  'cdg-accordion-expanded-section',
  CdgAccordionExpandedSection,
)

export {CdgAccordionDefaultSection, CdgAccordionExpandedSection}
