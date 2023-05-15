import {CdgAccordion} from './accordion'
import {CdgAccordionContent} from './accordion-content'
import {CdgAccordionHeader} from './accordion-header'

customElements.define('cdg-accordion', CdgAccordion)
customElements.define('cdg-accordion-header', CdgAccordionHeader)
customElements.define('cdg-accordion-content', CdgAccordionContent)

export {CdgAccordion, CdgAccordionContent, CdgAccordionHeader}
