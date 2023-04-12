import {CdgAccordionDefaultSection} from './default/default.section'
import {CdgAccordionExpandedSection} from './expanded/expanded.section'
import {CdgAccordionPropertiesSection} from './properties/properties.section'

customElements.define(
  'cdg-accordion-default-section',
  CdgAccordionDefaultSection,
)

customElements.define(
  'cdg-accordion-expanded-section',
  CdgAccordionExpandedSection,
)

customElements.define(
  'cdg-accordion-properties-section',
  CdgAccordionPropertiesSection,
)

export {
  CdgAccordionDefaultSection,
  CdgAccordionExpandedSection,
  CdgAccordionPropertiesSection,
}
